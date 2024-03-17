// TaskForm.tsx
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
import { ITask } from '../../../redux/api/types'

interface TaskFormProps {
    task?: ITask
    onSave: (editedTask: ITask) => void
    onCancel: () => void
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onCancel }) => {
    const theme = useTheme()

    const [editedTask, setEditedTask] = useState<ITask>(
        task || {
            id: 0,
            title: '',
            description: '',
            dueDate: new Date(),
            createdDate: new Date(),
            lastModifiedDate: new Date(),
            status: 'open',
            projectCategory: '',
            projectTitle: '',
        },
    )

    useEffect(() => {
        if (task) {
            setEditedTask({ ...task })
        }
    }, [task])

    const handleSave = () => {
        console.log('Saving Task:', editedTask)
        onSave(editedTask)
        onCancel()
    }

    return (
        <Dialog
            open={true}
            onClose={onCancel}
            sx={{ '& .MuiDialog-paper': { maxWidth: '900px', width: '70%' } }}
        >
            <DialogTitle>{task ? 'Edit Task' : 'Add Task'}</DialogTitle>
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
                            value={editedTask.status}
                            onChange={(e) =>
                                setEditedTask({
                                    ...editedTask,
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
                            value={editedTask.projectCategory}
                            onChange={(e) =>
                                setEditedTask({
                                    ...editedTask,
                                    projectCategory: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            type="text"
                            label="Project Name"
                            sx={{
                                width: '50%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedTask.projectTitle}
                            onChange={(e) =>
                                setEditedTask({
                                    ...editedTask,
                                    projectTitle: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            type="text"
                            label="Task Title"
                            variant="filled"
                            multiline
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedTask.title}
                            onChange={(e) =>
                                setEditedTask({
                                    ...editedTask,
                                    title: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            type="text"
                            label="Task Description"
                            variant="filled"
                            multiline
                            minRows={4}
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedTask.description}
                            onChange={(e) =>
                                setEditedTask({
                                    ...editedTask,
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
                                setEditedTask({
                                    ...editedTask,
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

export default TaskForm
