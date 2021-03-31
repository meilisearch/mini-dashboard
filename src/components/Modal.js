import React from 'react'
import Color from 'color'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Dialog as ReakitDialog,
  DialogBackdrop as ReakitDialogBackdrop,
} from 'reakit/Dialog'
import { Button as BaseButton } from 'reakit/Button'

import Close from 'components/icons/Close'
import Typography from 'components/Typography'

const DialogBackdrop = styled(ReakitDialogBackdrop)`
  &[data-leave] {
    opacity: 0;
  }
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
  background-color: ${(p) => Color(p.theme.colors.gray[3]).alpha(0.6)};
`

const Dialog = styled(ReakitDialog)`
  &[data-leave] {
    opacity: 0;
  }
  &[data-enter] {
    opacity: 1;
  }
  transition: opacity 250ms ease-in-out;
  position: relative;
  width: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 48px));
  border-radius: 0.25rem;
  outline: 0px;
  padding: 24px 32px 24px 40px;
  box-shadow: 0px 0px 30px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.15)};
  background-color: ${(p) => p.theme.colors.gray[11]};
  z-index: 999;
`

const Button = styled(BaseButton)`
  position: absolute;
  top: 24px;
  right: 24px;
  background-color: transparent;
  border: 0;
  &:focus {
    outline: none;
    svg {
      filter: drop-shadow(
        0px 0px 3px ${(p) => Color(p.theme.colors.gray[0]).alpha(0.3)}
      );
    }
  }
  &:hover {
    pointer-events: initial;
    cursor: pointer;
  }
`

const Modal = ({ title, closable = true, dialog, children, ...props }) => (
  <DialogBackdrop {...dialog}>
    <Dialog
      {...dialog}
      aria-label="Welcome"
      preventBodyScroll
      hideOnClickOutside={closable}
      hideOnEsc={closable}
      {...props}
    >
      {title && (
        <Typography variant="typo1" mb={4}>
          {title}
        </Typography>
      )}
      {children}
      {closable && (
        <Button onClick={() => dialog.hide()}>
          <Close />
        </Button>
      )}
    </Dialog>
  </DialogBackdrop>
)

Modal.propTypes = {
  /**
   * Title of the Modal
   */
  title: PropTypes.string,
  /**
   * Whether the modal can be closed or not
   */
  closable: PropTypes.bool,
  /**
   * Modal contents
   */
  children: PropTypes.node,
}

Modal.defaultProps = {
  title: null,
  closable: true,
  children: null,
}

export default Modal
