import React from 'react'
import styled from 'styled-components'
import useExportDataset from 'hooks/useExportDataset'
import baseUrl from 'config'
import {
  SpinningIcon,
  Input,
  Button,
  ErrorMessage,
  SuccessMessage,
} from 'components/FormElements'
import ArrowPathIcon from './icons/heroicons/ArrowPathIcon'
import CheckIcon from './icons/heroicons/CheckIcon'

const CancelButton = styled.button`
  padding: 0.75rem 1rem;
  background: transparent;
  color: ${(p) => p.theme.colors.gray[5]};
  border: 1px solid ${(p) => p.theme.colors.gray[8]};
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 0.5rem;
  &:hover {
    background: ${(p) => p.theme.colors.gray[10]};
    border-color: ${(p) => p.theme.colors.gray[7]};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const ExportDatasetForm = () => {
  const [meilisearchUrl, setMeilisearchUrl] = React.useState('')
  const [masterKey, setMasterKey] = React.useState('')
  const { exportDataset, cancelTask } = useExportDataset()
  const [status, setStatus] = React.useState('idle')
  const [error, setError] = React.useState(null)
  const [progress, setProgress] = React.useState('')
  const [progressPercentage, setProgressPercentage] = React.useState(null)
  const [currentTaskUid, setCurrentTaskUid] = React.useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError(null)
    setProgress('Initiating export...')
    setProgressPercentage(null)

    const onProgress = (progressData) => {
      setProgress(progressData.message)
      setProgressPercentage(progressData.percentage || null)
      setCurrentTaskUid(progressData.taskUid || null)
    }

    try {
      await exportDataset(meilisearchUrl, masterKey, onProgress, baseUrl)
      setStatus('success')
      setProgress('')
      setProgressPercentage(null)
      setCurrentTaskUid(null)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'An unknown error occurred')
      setProgress('')
      setProgressPercentage(null)
      setCurrentTaskUid(null)
    }
  }

  const handleCancel = async () => {
    if (currentTaskUid) {
      try {
        await cancelTask(currentTaskUid)
        setStatus('idle')
        setProgress('')
        setProgressPercentage(null)
        setCurrentTaskUid(null)
        setError(null)
      } catch (err) {
        setError(`Failed to cancel task: ${err.message || 'Unknown error'}`)
      }
    }
  }

  if (status === 'success') {
    return (
      <SuccessMessage>
        <CheckIcon />
        <p>Export completed successfully!</p>
      </SuccessMessage>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="url"
        placeholder="Enter the Meilisearch URL"
        value={meilisearchUrl}
        onChange={(e) => setMeilisearchUrl(e.target.value)}
        disabled={status === 'loading'}
        required
        style={{ marginTop: '0rem' }}
      />
      <Input
        type="password"
        placeholder="Enter the Meilisearch master key"
        value={masterKey}
        onChange={(e) => setMasterKey(e.target.value)}
        disabled={status === 'loading'}
        required
        style={{ marginTop: '0rem' }}
      />
      <ButtonGroup>
        <Button
          type="submit"
          disabled={status === 'loading'}
          aria-label="Upload"
          style={{ flex: 1 }}
        >
          {status === 'loading' ? (
            <>
              <SpinningIcon>
                <ArrowPathIcon />
              </SpinningIcon>
              {progress || 'Exporting dataset...'}
              {progressPercentage !== null && ` (${progressPercentage}%)`}
            </>
          ) : (
            'Export Dataset'
          )}
        </Button>
        {status === 'loading' && currentTaskUid && (
          <CancelButton
            type="button"
            onClick={handleCancel}
            aria-label="Cancel"
          >
            Cancel
          </CancelButton>
        )}
      </ButtonGroup>
      {status === 'error' && <ErrorMessage>{error}</ErrorMessage>}
    </form>
  )
}

export default ExportDatasetForm
