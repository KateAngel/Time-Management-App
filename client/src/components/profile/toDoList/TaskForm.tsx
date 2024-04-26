// TaskForm.tsx
import React, { useState, useEffect } from 'react'
import {
    Box,
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
    Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import { DateTime } from 'luxon'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import { ITask, IProject } from '../../../redux/api/types'
import { useGetAllProjectsQuery } from '../../../redux/api/projectApi'

interface TaskFormProps {
    task?: ITask
    onSave: (editedTask: ITask) => void
    onCancel: () => void
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onCancel }) => {
    const theme = useTheme()

    const taskStatus = [
        'Upcoming',
        'In progress',
        'On hold',
        'Completed',
        'Cancelled',
        'Reopened',
    ]

    const [projects, setProjects] = useState<IProject[]>([])

    const {
        data: projectsData,
        isLoading: projectsLoading,
        isError: projectsError,
    } = useGetAllProjectsQuery()

    useEffect(() => {
        if (projectsData) {
            setProjects(projectsData)
        }
    }, [projectsData])
    //console.log('projects:', projects)

    useEffect(() => {
        if (projectsError) {
            console.error('Error fetching projects:', projectsError)
        }
    }, [projectsError])

    // Function to generate a simple UUID (or maybe I will use a package 'uuid'???)
    const generateUUID = (): string => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
                const r = (Math.random() * 16) | 0,
                    v = c === 'x' ? r : (r & 0x3) | 0x8

                return v.toString(16)
            },
        )
    }

    const [editedTask, setEditedTask] = useState<ITask>(
        task || {
            id: generateUUID(),
            title: '',
            description: '',
            status: taskStatus[0],
            dueDate: DateTime.now(),
            created_at: DateTime.now(),
            updated_at: DateTime.now(),
            project: {} as IProject,
        },
    )

    // useEffect(() => {
    //     if (task && projects.length > 0) {
    //         const projectWithCategory: IProject | undefined = projects.find(
    //             (project) => project.id === task.project.id,
    //         )

    //         console.log(
    //             'projectWithCategory',
    //             projects.find((project) => project.id === task.project.id),
    //         )

    //         if (projectWithCategory) {
    //             setEditedTask({
    //                 ...task,
    //                 project: projectWithCategory,
    //                 // project: {
    //                 //     ...task.project,
    //                 //     category: projectWithCategory.category,
    //                 // },
    //             })
    //         } else {
    //             setEditedTask({
    //                 ...task,
    //             })
    //         }
    //     }
    // }, [task, projects])

    useEffect(() => {
        if (task) {
            setEditedTask({
                ...task,
            })
        }
    }, [task])

    useEffect(() => {
        console.log('editedTask:', editedTask)
    }, [editedTask])

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
            <DialogContent sx={{ minWidth: '280px', flexGrow: 1 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12} sm={8} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="project-label">Project</InputLabel>
                            <Select
                                labelId="project-label"
                                value={
                                    editedTask.project
                                        ? `${
                                              editedTask.project.projectTitle
                                          } - ${
                                              editedTask.project.category
                                                  ?.projectCategory || ''
                                          }`
                                        : ''
                                }
                                onChange={(e) => {
                                    // Split the combined value into projectTitle and projectCategory
                                    const [projectTitle, projectCategory] =
                                        e.target.value.split(' - ')

                                    // Find the selected project based on the project title
                                    const selectedProject =
                                        projects.find(
                                            (project) =>
                                                project.projectTitle ===
                                                projectTitle,
                                        ) || ({} as IProject)

                                    console.log(
                                        'Selected Project:',
                                        selectedProject,
                                    )

                                    setEditedTask({
                                        ...editedTask,
                                        project: selectedProject,
                                    })
                                }}
                                input={<OutlinedInput label="Project" />}
                            >
                                {projects.map((project) => (
                                    <MenuItem
                                        key={project.id}
                                        value={`${project.projectTitle} - ${
                                            project.category?.projectCategory ||
                                            ''
                                        }`}
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                        >
                                            <Typography
                                                variant="body2"
                                                fontSize="1rem"
                                            >
                                                {project.projectTitle}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {' - '}
                                                {
                                                    project.category
                                                        ?.projectCategory
                                                }
                                            </Typography>
                                        </Box>
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
                                value={editedTask.status || ''}
                                onChange={(e) =>
                                    setEditedTask({
                                        ...editedTask,
                                        status: e.target.value ?? null,
                                    })
                                }
                                input={<OutlinedInput label="Status" />}
                            >
                                {taskStatus.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8} md={4}>
                        <DateTimePicker
                            label="Due Date"
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedTask.dueDate}
                            onChange={(date: DateTime | null) => {
                                if (date) {
                                    setEditedTask({
                                        ...editedTask,
                                        dueDate: date,
                                    })
                                }
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
