import React, { useState } from 'react'
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
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Accordion
            key={task.id}
            expanded={isExpanded}
            onChange={() => setIsExpanded(!isExpanded)}
        >
            <AccordionSummary>
                <Box sx={{ position: 'absolute', top: 24, left: 16 }}>
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
                <Typography sx={{ position: 'absolute', top: 8, right: 40 }}>
                    {task.status}
                </Typography>
                <Box
                    sx={{
                        maxWidth: 'calc(100% - 32px)',
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            verticalAlign: 'middle',
                            fontWeight: 'bold',
                            flex: '1 1 auto',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: isExpanded ? 7 : 1,
                        }}
                    >
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
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {task.description}
                </Typography>
                <Typography
                    variant="body2"
                    color="secondary.main"
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
                    color="secondary.main"
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
