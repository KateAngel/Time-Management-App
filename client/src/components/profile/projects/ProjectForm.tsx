// ProjectForm.tsx
import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Tooltip,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import { DateTime } from 'luxon'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import CancelIcon from '@mui/icons-material/Cancel'
import { IProject, ICategory } from '../../../redux/api/types'
import { useGetAllCategoriesQuery } from '../../../redux/api/categoryApi'
import { LoadingButton } from '@mui/lab'

interface ProjectFormProps {
    project?: IProject
    onSave: (editedProject: IProject) => void
    onCancel: () => void
}

const ProjectForm: React.FC<ProjectFormProps> = ({
    project,
    onSave,
    onCancel,
}) => {
    const theme = useTheme()

    const projectStatus = [
        'Upcoming',
        'In progress',
        'On hold',
        'Completed',
        'Cancelled',
        'Reopened',
    ]

    const [categories, setCategories] = useState<ICategory[]>([])

    const {
        data: categoriesData,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetAllCategoriesQuery()

    useEffect(() => {
        if (categoriesData) {
            setCategories(categoriesData)
        }
    }, [categoriesData])

    useEffect(() => {
        if (categoriesError) {
            console.error('Error fetching categories:', categoriesError)
        }
    }, [categoriesError])

    const [editedProject, setEditedProject] = useState<IProject>(
        project || {
            id: 0,
            projectTitle: '',
            description: '',
            status: projectStatus[0],
            dueDate: DateTime.now(),
            created_at: DateTime.now(),
            updated_at: DateTime.now(),
            category: {} as ICategory,
        },
    )

    useEffect(() => {
        if (project) {
            setEditedProject({ ...project })
        }
    }, [project])

    const handleSave = () => {
        console.log('Saving Project:', editedProject)
        onSave(editedProject)
        onCancel()
    }

    return (
        <Dialog
            open={true}
            onClose={onCancel}
            sx={{ '& .MuiDialog-paper': { maxWidth: '900px', width: '70vw' } }}
        >
            <DialogTitle>
                {project ? 'Edit Project' : 'Add Project'}
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
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            label="Project Title"
                            variant="filled"
                            multiline
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedProject.projectTitle || ''}
                            onChange={(e) =>
                                setEditedProject({
                                    ...editedProject,
                                    projectTitle: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            label="Project Description"
                            variant="filled"
                            multiline
                            minRows={4}
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedProject.description}
                            onChange={(e) =>
                                setEditedProject({
                                    ...editedProject,
                                    description: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="project-category-label">
                                Project Category
                            </InputLabel>
                            <Select
                                labelId="project-category-label"
                                value={
                                    editedProject.category.projectCategory || ''
                                }
                                onChange={(e) =>
                                    setEditedProject({
                                        ...editedProject,
                                        category:
                                            categories.find(
                                                (category) =>
                                                    category.projectCategory ===
                                                    e.target.value,
                                            ) || ({} as ICategory),
                                    })
                                }
                                input={
                                    <OutlinedInput label="Project Category" />
                                }
                            >
                                {categories.map((category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.projectCategory}
                                    >
                                        {category.projectCategory}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                value={editedProject.status || ''}
                                onChange={(e) =>
                                    setEditedProject({
                                        ...editedProject,
                                        status: e.target.value ?? null,
                                    })
                                }
                            >
                                {projectStatus.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8} md={4}>
                        <>
                            <DateTimePicker<DateTime>
                                label="Due Date"
                                sx={{
                                    width: '100%',
                                    '& .MuiInputBase-root': {
                                        borderRadius: 0,
                                    },
                                }}
                                value={editedProject.dueDate}
                                onChange={(date: DateTime | null) => {
                                    if (date) {
                                        setEditedProject({
                                            ...editedProject,
                                            dueDate: date,
                                        })
                                    }
                                }}
                            />
                        </>
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

export default ProjectForm
