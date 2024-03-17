import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

interface ItemActionsMenuProps {
    onEdit: () => void
    onDelete: () => void
}

const ItemActionsMenu: React.FC<ItemActionsMenuProps> = ({
    onEdit,
    onDelete,
}) => {
    const [anchorEl, setAnchorEl] = useState<
        (EventTarget & HTMLElement) | null
    >(null)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <IconButton
                aria-controls="card-actions-menu"
                aria-haspopup="true"
                onClick={handleClick}
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }}
            >
                <MoreVertSharpIcon />
            </IconButton>
            <Menu
                id="card-actions-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={onEdit}>
                    <EditIcon sx={{ marginRight: 1 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={onDelete}>
                    <DeleteIcon sx={{ marginRight: 1 }} />
                    Delete
                </MenuItem>
            </Menu>
        </>
    )
}

export default ItemActionsMenu
