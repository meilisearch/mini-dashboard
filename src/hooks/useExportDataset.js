import { baseUrl } from '../App'
import { useMeilisearchClientContext } from '../context/MeilisearchClientContext'

function getBody({ meilisearchUrl, masterKey }) {
  return {
    url: meilisearchUrl,
    apiKey: masterKey,
  }
}

const pollTaskStatus = (client, taskUid, onProgress) =>
  new Promise((resolve, reject) => {
    const checkStatus = async () => {
      try {
        const task = await client.getTask(taskUid)

        if (task.status === 'succeeded') {
          resolve(task)
        } else if (task.status === 'failed') {
          reject(new Error(task.error?.message || 'Task failed'))
        } else {
          // Check if task has batchUid
          if (!task.batchUid) {
            onProgress({
              status: 'waiting',
              message: 'Waiting for export to start',
            })
          } else {
            // Fetch batch progress
            try {
              const batch = await client.getBatch(task.batchUid)
              if (
                batch.progress &&
                batch.progress.percentage !== null &&
                batch.progress.percentage > 0
              ) {
                onProgress({
                  status: 'processing',
                  percentage: Math.round(batch.progress.percentage),
                  message: `Uploading`,
                })
              } else if (batch.progress === null) {
                onProgress({
                  status: 'uploading',
                  message: 'Upload successful',
                })
              } else {
                onProgress({
                  status: 'processing',
                  message: 'Processing export...',
                })
              }
            } catch (batchError) {
              onProgress({
                status: 'processing',
                message: 'Processing export...',
              })
            }
          }
          // Task is still processing, check again in 500ms
          setTimeout(checkStatus, 500)
        }
      } catch (error) {
        reject(error)
      }
    }

    checkStatus()
  })

export default function useExport() {
  const { meilisearchJsClient } = useMeilisearchClientContext()
  const endpoint = `${baseUrl}/export`

  const exportDataset = async (meilisearchUrl, masterKey, onProgress) => {
    // Validate inputs
    if (!meilisearchUrl || !masterKey) {
      throw new Error('Meilisearch URL and master key are required')
    }

    // First, make the export request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        getBody({
          meilisearchUrl,
          masterKey,
        })
      ),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Export request failed (${response.status}): ${errorText || response.statusText}`
      )
    }

    const data = await response.json()

    // Assuming the response contains a taskUid
    if (!data.taskUid) {
      throw new Error('No task UID returned from export request')
    }

    // Poll the task status using the local Meilisearch instance
    return pollTaskStatus(meilisearchJsClient, data.taskUid, onProgress)
  }

  return { exportDataset }
}
