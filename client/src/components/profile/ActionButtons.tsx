// ActionButtons.tsx
import React, { useState } from 'react'
import { Box, Fab, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp'
import CheckListSharpIcon from '@mui/icons-material/ChecklistSharp'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp'

import FilterForm from './FilterForm'

interface ActionButtonsProps {
    openForm: () => void
    filterItems: (text: string, selectedFilters: string[]) => void
    filterOptions: string[]
    tooltipTitle: string
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    openForm,
    filterItems,
    filterOptions,
    tooltipTitle,
}) => {
    const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false)

    const handleToggleFilterOptions = () => {
        setShowFilterOptions(!showFilterOptions)
    }

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Tooltip title={tooltipTitle} placement="top-start">
                <Fab size="small" color="primary" onClick={openForm}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Tooltip title="Filter" placement="top-start">
                <Fab
                    size="small"
                    color="secondary"
                    onClick={handleToggleFilterOptions}
                >
                    <FilterAltSharpIcon />
                </Fab>
            </Tooltip>
            <Tooltip title="Delete All" placement="top-start">
                <Fab
                    variant="extended"
                    size="small"
                    color="error"
                    // onClick={() => handleDelete()}
                    sx={{ textTransform: 'none' }}
                >
                    <DeleteForeverSharpIcon sx={{ mr: 1 }} />
                    Delete All
                </Fab>
            </Tooltip>
            <FilterForm
                filterOptions={filterOptions}
                filterItems={filterItems}
                showFilterOptions={showFilterOptions}
                setShowFilterOptions={setShowFilterOptions}
            />
        </Box>
    )
}

export default ActionButtons
