// ToDoList.tsx
import { useState } from 'react'
import {
    Box,
    Breadcrumbs,
    Container,
    Typography,
    List,
    IconButton,
    Tooltip,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import TaskForm from '../../components/profile/toDoList/TaskForm'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '../../styles/taskStyles'
import { ITask } from '../../redux/api/types'
import { TabTitleTypography } from '../../styles/profile.styles'

const ToDoList = () => {
    const theme = useTheme()

    const [tasks, setTasks] = useState<ITask[]>([])
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<ITask | null>(null)

    const openTaskForm = (task: ITask | null = null) => {
        setSelectedTask(task)
        setShowTaskForm(true)
    }

    const closeTaskForm = () => {
        setShowTaskForm(false)
        setSelectedTask(null)
    }

    const saveTask = (editedTask: ITask) => {
        const now = new Date()
        editedTask.lastModifiedDate = now

        if (selectedTask) {
            // Editing existing task
            const updatedTasks = tasks.map((task) =>
                task.id === selectedTask.id ? editedTask : task,
            )

            setTasks(updatedTasks)
        } else {
            // Adding new task
            editedTask.id = tasks.length + 1
            editedTask.createdDate = now
            setTasks([...tasks, editedTask])
        }

        closeTaskForm()
    }

    const deleteTask = (taskId: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedTasks)
    }

    return (
        <Container maxWidth="lg">
            <Box>
                <TabTitleTypography>To-do list</TabTitleTypography>
                <Tooltip title="Add Task">
                    <IconButton
                        onClick={() => openTaskForm()}
                        //sx={{ backgroundColor: theme.palette.secondary.main }}
                    >
                        <AddCircleSharpIcon />
                    </IconButton>
                </Tooltip>
                {showTaskForm && (
                    <TaskForm
                        task={selectedTask || undefined}
                        onSave={(editedTask) => saveTask(editedTask)}
                        onCancel={closeTaskForm}
                    />
                )}
                <List>
                    {tasks.map((task) => (
                        <Accordion key={task.id}>
                            <AccordionSummary>
                                <Breadcrumbs
                                    separator="›"
                                    aria-label="breadcrumb"
                                    sx={{
                                        width: '88%',
                                        fontSize: '1.5rem',
                                    }}
                                >
                                    <Typography>
                                        {task.projectCategory}
                                    </Typography>
                                    <Typography>{task.projectTitle}</Typography>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            width: '88%',
                                            fontSize: '1.5rem',
                                        }}
                                    >
                                        {task.title}
                                    </Typography>
                                </Breadcrumbs>
                                <Typography>{task.status}</Typography>
                                <Tooltip title="Edit">
                                    <IconButton
                                        onClick={() => {
                                            openTaskForm(task)
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{task.description}</Typography>
                                <Typography>
                                    Due Date:{' '}
                                    {task.dueDate?.toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        second: 'numeric',
                                    }) || ''}
                                </Typography>
                                <Typography>
                                    Created Date:{' '}
                                    {task.createdDate.toLocaleString()}
                                </Typography>
                                <Typography>
                                    Last Modified Date:{' '}
                                    {task.lastModifiedDate?.toLocaleString() ||
                                        ''}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </List>
            </Box>
        </Container>
    )
}

export default ToDoList
