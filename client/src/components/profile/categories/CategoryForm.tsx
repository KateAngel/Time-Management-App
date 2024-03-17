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
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import { ICategory } from '../../../redux/api/types'

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

    useEffect(() => {
        if (category) {
            setEditedCategory({ ...category })
        }
    }, [category])

    const handleSave = () => {
        onSave(editedCategory)
        onCancel()
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target

        setEditedCategory((prevState) => ({
            ...prevState,
            [name]: value,
        }))
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
                            label="Category Title"
                            variant="filled"
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedCategory.projectCategory || ''}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            type="text"
                            name="description"
                            label="Category Description"
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
            <DialogActions>
                <IconButton onClick={handleSave}>
                    <Tooltip title="Save">
                        <SaveIcon />
                    </Tooltip>
                </IconButton>
            </DialogActions>
        </Dialog>
    )
}

export default CategoryForm
