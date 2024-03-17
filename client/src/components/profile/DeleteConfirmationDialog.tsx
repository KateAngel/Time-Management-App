// DeleteConfirmationDialog.tsx
import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'

interface DeleteConfirmationDialogProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
    open,
    onClose,
    onConfirm,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Delete Confirmation
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this category? This action
                    cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    No
                </Button>
                <Button onClick={onConfirm} color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteConfirmationDialog
