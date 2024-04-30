// ToDoList.tsx
import { useState, useEffect } from 'react'
import { Box, Container, List } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { toast } from 'react-toastify'
import { DateTime } from 'luxon'
import FullScreenLoader from '../../components/FullScreenLoader'
import ActionButtons from '../../components/profile/ActionButtons'
import DeleteConfirmationDialog from '../../components/profile/DeleteConfirmationDialog'
import TaskForm from '../../components/profile/toDoList/TaskForm'
import ToDoItem from '../../components/profile/toDoList/ToDoItem'
import { ITask } from '../../redux/api/types'
import {
    useGetAllTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} from '../../redux/api/todoApi'
import { TabTitleTypography } from '../../styles/profile.styles'

const ToDoList = () => {
    const theme = useTheme()

    const { isLoading, isError, error, data: tasks } = useGetAllTasksQuery()

    const [addTask] = useAddTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const [deleteTask] = useDeleteTaskMutation()

    const [showTaskForm, setShowTaskForm] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<ITask | null>(null)
    //console.log('openSelectedTask', selectedTask)
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)

    const [filterText, setFilterText] = useState<string>('')
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const openTaskForm = (task: ITask | null = null) => {
        setSelectedTask(task)
        setShowTaskForm(true)
    }

    const closeTaskForm = () => {
        setShowTaskForm(false)
        setSelectedTask(null)
    }

    const handleSaveTask = (editedTask: ITask) => {
        const now = DateTime.now()
        editedTask.updated_at = now

        if (selectedTask) {
            // Editing existing task
            updateTask(editedTask)
        } else {
            // Adding new task
            addTask(editedTask)
        }

        closeTaskForm()
    }

    const handleDelete = (taskId: string) => {
        setSelectedTask(tasks?.find((task) => task.id === taskId) || null)

        setDeleteConfirmation(true)
    }

    const handleConfirmDelete = () => {
        if (selectedTask) {
            deleteTask(selectedTask!.id)
            setDeleteConfirmation(false)
        }
    }

    const handleCancelDelete = () => {
        setDeleteConfirmation(false)
    }

    const filterTasks = (text: string, selectedFilters: string[]) => {
        setFilterText(text)
        setSelectedFilters(selectedFilters)
    }

    const filteredTasks = tasks?.filter((task) => {
        const matchesFilterText =
            task.title.toLowerCase().includes(filterText.toLowerCase()) ||
            task.description?.toLowerCase().includes(filterText.toLowerCase())

        const matchesFilters =
            selectedFilters.length === 0 ||
            selectedFilters.some((filter) => task.title.includes(filter))

        return matchesFilterText && matchesFilters
    })

    interface ErrorType {
        data: {
            error: {
                message: string
            }[]
            message: string
        }
    }

    useEffect(() => {
        if (isError) {
            const errorData = error as ErrorType

            if (Array.isArray(errorData.data.error)) {
                errorData.data.error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    }),
                )
            } else {
                toast.error(errorData.data.message, {
                    position: 'top-right',
                })
            }
        }
    }, [error, isError, isLoading])

    if (isLoading) {
        return <FullScreenLoader />
    }

    return (
        <Container maxWidth="lg">
            <Box>
                <TabTitleTypography>To-do list</TabTitleTypography>
                <ActionButtons
                    openForm={() => openTaskForm()}
                    filterItems={filterTasks}
                    filterOptions={tasks?.map((task) => task.title) || []}
                    tooltipTitle="Add Task"
                />
                {showTaskForm && (
                    <TaskForm
                        task={selectedTask || undefined}
                        onSave={(editedTask) => handleSaveTask(editedTask)}
                        onCancel={closeTaskForm}
                    />
                )}
                <List>
                    {filteredTasks &&
                        filteredTasks.length > 0 &&
                        [...filteredTasks]
                            .sort((a, b) => a.title.localeCompare(b.title))
                            .map((task: ITask) => (
                                <Box key={task.id} mt={theme.spacing(1)}>
                                    <ToDoItem
                                        task={task}
                                        onEdit={() => openTaskForm(task)}
                                        onDelete={() => handleDelete(task.id)}
                                    />
                                </Box>
                            ))}
                </List>
            </Box>
            <DeleteConfirmationDialog
                open={deleteConfirmation}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </Container>
    )
}

export default ToDoList
