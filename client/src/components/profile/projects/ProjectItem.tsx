import React, { useState } from 'react'
import { Typography, Box } from '@mui/material'
import { IProject } from '../../../redux/api/types'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '../../../styles/taskStyles'
import ItemActionsMenu from '../ItemActionsMenu'

interface ProjectItemProps {
    project: IProject
    onEdit: () => void
    onDelete: () => void
}

const ProjectItem: React.FC<ProjectItemProps> = ({
    project,
    onEdit,
    onDelete,
}) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Accordion
            key={project.id}
            expanded={isExpanded}
            onChange={() => setIsExpanded(!isExpanded)}
        >
            <AccordionSummary>
                <Box sx={{ position: 'absolute', top: 24, left: 16 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                    >
                        {project.category?.projectCategory
                            ? project.category.projectCategory
                            : 'No category'}
                    </Typography>
                </Box>
                <ItemActionsMenu onEdit={onEdit} onDelete={onDelete} />
                <Typography sx={{ position: 'absolute', top: 8, right: 40 }}>
                    {project.status}
                </Typography>
                <Box
                    sx={{
                        // position: 'absolute',
                        // top: '50%',
                        // left: '20px',
                        // transform: 'translate(0, -50%)',
                        maxWidth: 'calc(100% - 16px)',
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: '800',
                            flex: '1 1 auto',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: isExpanded ? 7 : 1,
                        }}
                    >
                        {project.projectTitle}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize={12}
                    >
                        Due Date: <br />
                        {project.dueDate
                            ? project.dueDate.toLocaleString({
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
                    {project.description}
                </Typography>
                <Typography
                    variant="body2"
                    color="secondary.main"
                    fontSize={12}
                >
                    Created:{' '}
                    {project.created_at.toLocaleString({
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
                    {project.updated_at &&
                        project.updated_at.toLocaleString({
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                        })}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default ProjectItem
