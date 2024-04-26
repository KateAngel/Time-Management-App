import React from 'react'
import { Box, Typography, Breadcrumbs } from '@mui/material'
import { ITask } from '../../../redux/api/types'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '../../../styles/taskStyles'
import ItemActionsMenu from '../ItemActionsMenu'

interface ToDoItemProps {
    task: ITask
    onEdit: () => void
    onDelete: () => void
}

const ToDoItem: React.FC<ToDoItemProps> = ({ task, onEdit, onDelete }) => {
    return (
        <Accordion key={task.id}>
            <AccordionSummary>
                <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
                    <Breadcrumbs
                        separator="›"
                        aria-label="breadcrumb"
                        sx={{ fontWeight: 'bold' }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {task.project?.category
                                ? task.project.category.projectCategory
                                : 'No category'}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {task.project?.projectTitle
                                ? task.project.projectTitle
                                : 'No project'}
                        </Typography>
                    </Breadcrumbs>
                </Box>
                <ItemActionsMenu onEdit={onEdit} onDelete={onDelete} />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '20px',
                        transform: 'translate(0, -50%)',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {task.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize={12}
                    >
                        Due Date:{' '}
                        {task.dueDate
                            ? task.dueDate.toLocaleString({
                                  year: 'numeric',
                                  month: 'short',
                                  day: '2-digit',
                                  hour: '2-digit',
                                  minute: '2-digit',
                              })
                            : ''}
                    </Typography>
                </Box>
                <Typography sx={{ position: 'absolute', top: 8, right: 48 }}>
                    {task.status}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{task.description}</Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={12}
                >
                    Created:{' '}
                    {task.created_at.toLocaleString({
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                    })}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={12}
                >
                    Last Edited:{' '}
                    {task.updated_at &&
                        task.updated_at.toLocaleString({
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                        })}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default ToDoItem
