// ProjectForm.tsx
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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import { IProject } from '../redux/api/types'

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

    const [editedProject, setEditedProject] = useState<IProject>(
        project || {
            id: 0,
            projectTitle: '',
            description: '',
            status: 'open',
            dueDate: new Date(),
            created_at: new Date(),
            updated_at: new Date(),
            projectCategory: '',
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
            sx={{ '& .MuiDialog-paper': { maxWidth: '900px', width: '70%' } }}
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
            <DialogContent sx={{ minWidth: '400px', flexGrow: 1 }}>
                <Grid
                    container
                    spacing={4}
                    direction="column"
                    justifyContent="space-evenly"
                >
                    <Grid item xs={4}>
                        <TextField
                            type="text"
                            label="Status"
                            sx={{
                                width: '50%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedProject.status}
                            onChange={(e) =>
                                setEditedProject({
                                    ...editedProject,
                                    status: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            type="text"
                            label="Project Category"
                            sx={{
                                width: '50%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedProject.projectCategory}
                            onChange={(e) =>
                                setEditedProject({
                                    ...editedProject,
                                    projectCategory: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
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
                            value={editedProject.projectTitle}
                            onChange={(e) =>
                                setEditedProject({
                                    ...editedProject,
                                    projectTitle: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={8}>
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
                    <Grid item xs={4}>
                        <DateTimePicker
                            label="Due Date"
                            sx={{
                                width: '50%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            onChange={(date: Date | null) => {
                                setEditedProject({
                                    ...editedProject,
                                    dueDate: date || new Date(),
                                })
                            }}
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

export default ProjectForm
