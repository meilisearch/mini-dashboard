import { baseUrl } from '../App'
import { useMeilisearchClientContext } from '../context/MeilisearchClientContext'

function getBody({ meilisearchUrl, masterKey }) {
  return {
    url: meilisearchUrl,
    apiKey: masterKey,
  }
}

const pollTaskStatus = (client, taskUid) =>
  new Promise((resolve, reject) => {
    const checkStatus = async () => {
      try {
        const task = await client.getTask(taskUid)

        if (task.status === 'succeeded') {
          resolve(task)
        } else if (task.status === 'failed') {
          reject(new Error(task.error?.message || 'Task failed'))
        } else {
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
  const endpoint = `${baseUrl}/export`

  const exportDataset = async (meilisearchUrl, masterKey) => {
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
    return pollTaskStatus(meilisearchJsClient, data.taskUid)
  }

  return { exportDataset }
}
