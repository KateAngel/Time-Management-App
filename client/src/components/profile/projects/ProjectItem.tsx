import React from 'react'
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
    return (
        <Accordion key={project.id}>
            <AccordionSummary>
                <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize={12}
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                    >
                        {project.projectCategory
                            ? project.projectCategory
                            : 'No category'}
                    </Typography>
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
                <Typography sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                    {project.status}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{project.description}</Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
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
                    color="text.secondary"
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
