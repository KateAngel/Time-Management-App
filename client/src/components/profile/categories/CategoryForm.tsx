// CategoryForm.tsx
import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip,
} from '@mui/material'

import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import CancelIcon from '@mui/icons-material/Cancel'
import { ICategory } from '../../../redux/api/types'
import { LoadingButton } from '@mui/lab'
import { object, string, TypeOf } from 'zod'

const categorySchema = object({
    projectCategory: string()
        .min(1, 'Category is required')
        .max(40, 'Category must not exceed 40 characters'),
})

export type CategoryFormData = TypeOf<typeof categorySchema>

interface CategoryFormProps {
    category?: ICategory
    onSave: (editedCategory: ICategory) => void
    onCancel: () => void
}

const CategoryForm: React.FC<CategoryFormProps> = ({
    category,
    onSave,
    onCancel,
}) => {
    const theme = useTheme()

    const [editedCategory, setEditedCategory] = useState<ICategory>(
        category || {
            id: 0,
            projectCategory: '',
            description: '',
            created_at: new Date(),
            updated_at: new Date(),
        },
    )

    const [categoryTitleError, setCategoryTitleError] = useState<boolean>(false)

    useEffect(() => {
        if (category) {
            setEditedCategory({ ...category })
        }
    }, [category])

    const handleSave = () => {
        try {
            categorySchema.parse(editedCategory)
            onSave(editedCategory)
            onCancel()
        } catch (error) {
            // Display validation error message
            //alert('Category title is required.')
            setCategoryTitleError(true)
        }
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target

        setEditedCategory((prevState) => ({
            ...prevState,
            [name]: value,
        }))
        // Remove validation error message

        if (name === 'projectCategory' && categoryTitleError) {
            setCategoryTitleError(false)
        }
    }

    return (
        <Dialog
            open={true}
            onClose={onCancel}
            sx={{ '& .MuiDialog-paper': { maxWidth: '900px', width: '70%' } }}
        >
            <DialogTitle>
                {category ? 'Edit Category' : 'Add Category'}
            </DialogTitle>
            <IconButton
                onClick={onCancel}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
            >
                <Tooltip title="Cancel">
                    <CancelIcon />
                </Tooltip>
            </IconButton>
            <DialogContent sx={{ minWidth: '280px', flexGrow: 1 }}>
                <Grid
                    container
                    spacing={4}
                    direction="column"
                    justifyContent="space-evenly"
                >
                    <Grid item xs={4}>
                        <TextField
                            type="text"
                            name="projectCategory"
                            label="Title"
                            variant="filled"
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedCategory.projectCategory || ''}
                            onChange={handleInputChange}
                            error={categoryTitleError}
                            inputProps={{ maxLength: 40 }}
                            helperText={
                                categoryTitleError &&
                                '* Title is required. Title must not exceed 40 characters.'
                            }
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            type="text"
                            name="description"
                            label="Description"
                            variant="filled"
                            multiline
                            minRows={4}
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedCategory.description}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Tooltip title="Save">
                    <LoadingButton
                        onClick={handleSave}
                        variant="contained"
                        sx={{ fontWeight: 'bold', textTransform: 'none' }}
                    >
                        Save & Submit
                    </LoadingButton>
                </Tooltip>
            </DialogActions>
        </Dialog>
    )
}

export default CategoryForm
