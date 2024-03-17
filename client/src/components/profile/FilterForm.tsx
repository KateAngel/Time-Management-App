// FilterForm.tsx
import React, { useState } from 'react'
import {
    Box,
    Checkbox,
    TextField,
    FormControlLabel,
    FormGroup,
    Button,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface FilterBoxProps {
    filterOptions: string[]
    filterItems: (text: string, selectedFilters: string[]) => void
    showFilterOptions: boolean
    setShowFilterOptions: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterForm: React.FC<FilterBoxProps> = ({
    filterOptions,
    filterItems,
    showFilterOptions,
    setShowFilterOptions,
}) => {
    const theme = useTheme()

    const [filterText, setFilterText] = useState<string>('')
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const handleApplyFilters = () => {
        filterItems(filterText, selectedFilters)
        setShowFilterOptions(!showFilterOptions)
    }

    const handleClearFilters = () => {
        setFilterText('')
        setSelectedFilters([])
    }

    return (
        <>
            {showFilterOptions && (
                <Box
                    minWidth={200}
                    maxWidth={300}
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        p: '16px',
                    }}
                >
                    <TextField
                        label="Filter by text"
                        variant="outlined"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        margin="dense"
                    />
                    <FormGroup>
                        {filterOptions
                            .sort((a, b) => a.localeCompare(b))
                            .map((option) => (
                                <FormControlLabel
                                    key={option}
                                    control={
                                        <Checkbox
                                            checked={selectedFilters.includes(
                                                option,
                                            )}
                                            onChange={() => {
                                                if (
                                                    selectedFilters.includes(
                                                        option,
                                                    )
                                                ) {
                                                    setSelectedFilters(
                                                        selectedFilters.filter(
                                                            (item) =>
                                                                item !== option,
                                                        ),
                                                    )
                                                } else {
                                                    setSelectedFilters([
                                                        ...selectedFilters,
                                                        option,
                                                    ])
                                                }
                                            }}
                                        />
                                    }
                                    label={option}
                                />
                            ))}
                    </FormGroup>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            mt: 1,
                            gap: 1,
                        }}
                    >
                        <Button onClick={handleClearFilters}>Clear</Button>
                        <Button variant="outlined" onClick={handleApplyFilters}>
                            Apply
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default FilterForm
