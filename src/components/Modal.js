import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Dialog as ReakitDialog,
  DialogBackdrop as ReakitDialogBackdrop,
  DialogDisclosure,
  useDialogState,
} from 'reakit/Dialog'

const DialogBackdrop = styled(ReakitDialogBackdrop)`
  opacity: 0;
  &[data-enter] {
    opacity: 1;
  }
  transition: opacity 250ms ease-in-out;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 997;
  background-color: rgb(0, 0, 0, 0.6);
`

const Dialog = styled(ReakitDialog)`
  opacity: 0;
  &[data-enter] {
    opacity: 1;
  }
  transition: opacity 250ms ease-in-out;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 48px));
  border-radius: 0.25rem;
  padding: 1em;
  outline: 0px;
  border: 1px solid rgba(33, 33, 33, 0.25);
  color: rgb(33, 33, 33);
  z-index: 999;
`

const Modal = ({ buttonText, visible = false, children }) => {
  const dialog = useDialogState({ animated: true, visible })

  return (
    <>
      {buttonText && (
        <DialogDisclosure {...dialog}>{buttonText}</DialogDisclosure>
      )}
      <DialogBackdrop {...dialog}>
        <Dialog {...dialog} aria-label="Welcome" preventBodyScroll>
          {children}
        </Dialog>
      </DialogBackdrop>
    </>
  )
}

Modal.propTypes = {
  /**
   * The text to be displayed inside the button
   */
  buttonText: PropTypes.string,
  /**
   * The initial state of the modal
   */
  visible: PropTypes.bool,
  /**
   * Modal contents
   */
  children: PropTypes.node,
}

Modal.defaultProps = {
  buttonText: null,
  visible: false,
  children: null,
}

export default Modal
