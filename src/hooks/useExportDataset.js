import { useMeilisearchClientContext } from '../context/MeilisearchClientContext'
import useLocalStorage from './useLocalStorage'

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
          resolve({ task, taskUid })
        } else if (task.status === 'failed') {
          reject(new Error(task.error?.message || 'Task failed'))
        } else if (task.status === 'canceled') {
          reject(new Error('Task was cancelled'))
        } else {
          // Check if task has batchUid
          if (!task.batchUid) {
            onProgress({
              status: 'waiting',
              message: 'Waiting for export to start',
              taskUid,
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
                  message: `Processing: ${Math.round(batch.progress.percentage)}%`,
                  taskUid,
                })
              } else if (batch.progress === null) {
                onProgress({
                  status: 'uploading',
                  message: 'Upload successful',
                  taskUid,
                })
              } else {
                onProgress({
                  status: 'processing',
                  message: 'Processing export...',
                  taskUid,
                })
              }
            } catch (batchError) {
              onProgress({
                status: 'processing',
                message: 'Processing export...',
                taskUid,
              })
            }
          }
          // Task is still processing, check again in 1 second
          setTimeout(checkStatus, 1000)
        }
      } catch (error) {
        reject(error)
      }
    }

    checkStatus()
  })

export default function useExport() {
  const { meilisearchJsClient } = useMeilisearchClientContext()
  const [apiKey] = useLocalStorage('apiKey')

  const exportDataset = async (
    meilisearchUrl,
    masterKey,
    onProgress,
    baseUrl
  ) => {
    // Validate inputs
    if (!meilisearchUrl || !masterKey) {
      throw new Error('Meilisearch URL and master key are required')
    }
    if (!baseUrl) {
      throw new Error('baseUrl is required')
    }
    const endpoint = `${baseUrl}/export`
    // First, make the export request
    const headers = {
      'Content-Type': 'application/json',
    }

    // Add authorization header if API key is available
    if (apiKey) {
      headers.Authorization = `Bearer ${apiKey}`
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
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

  const cancelTask = async (taskUid) => {
    await meilisearchJsClient.cancelTasks({ uids: [taskUid] })
  }

  return { exportDataset, cancelTask }
}
