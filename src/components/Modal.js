import React from 'react'
import Color from 'color'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Dialog as ReakitDialog,
  DialogBackdrop as ReakitDialogBackdrop,
} from 'reakit/Dialog'

import IconButton from 'components/IconButton'
import Typography from 'components/Typography'
import { Cross } from 'components/icons'

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
  max-width: 992px;
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

const Button = styled(IconButton)`
  position: absolute;
  top: 16px;
  right: 16px;
  &:hover {
    pointer-events: initial;
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
        <Button color="gray.7" onClick={() => dialog.hide()}>
          <Cross style={{ width: 15 }} />
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
