// MyProjects.tsx
import { useState, useEffect } from 'react'
import {
    Box,
    Breadcrumbs,
    Container,
    Divider,
    Grid,
    Typography,
    IconButton,
    Tooltip,
    useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from 'react-toastify'

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '../../styles/taskStyles'
import FullScreenLoader from '../../components/FullScreenLoader'
import ProjectForm from '../../components/ProjectForm'
import { IProject } from '../../redux/api/types'
import {
    useGetAllProjectsQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} from '../../redux/api/projectApi'
import { TabTitleTypography } from '../../styles/profile.styles'

const MyProjects = () => {
    const theme = useTheme()
    const isXSScreen = useMediaQuery(theme.breakpoints.down('xs'))

    const {
        isLoading,
        isError,
        error,
        data: projects,
    } = useGetAllProjectsQuery()

    const [addProject] = useAddProjectMutation()
    const [updateProject] = useUpdateProjectMutation()
    const [deleteProject] = useDeleteProjectMutation()

    const [showProjectForm, setShowProjectForm] = useState<boolean>(false)

    const [selectedProject, setSelectedProject] = useState<IProject | null>(
        null,
    )

    const openProjectForm = (project: IProject | null = null) => {
        setSelectedProject(project)
        setShowProjectForm(true)
    }

    const closeProjectForm = () => {
        setShowProjectForm(false)
        setSelectedProject(null)
    }

    const handleSaveProject = (editedProject: IProject) => {
        const now = new Date()
        editedProject.updated_at = now

        if (selectedProject) {
            updateProject(editedProject)
        } else {
            addProject(editedProject)
        }

        closeProjectForm()
    }

    const handleDelete = (projectId: number) => {
        deleteProject(projectId)
    }

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
                <TabTitleTypography>Projects</TabTitleTypography>
                <Tooltip title="Add Project" placement="top-start">
                    <IconButton
                        onClick={() => openProjectForm()}
                        sx={{ backgroundColor: theme.palette.secondary.main }}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
                {showProjectForm && (
                    <ProjectForm
                        project={selectedProject || undefined}
                        onSave={(editedProject) =>
                            handleSaveProject(editedProject)
                        }
                        onCancel={closeProjectForm}
                    />
                )}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                    <Grid
                        container
                        rowSpacing={2}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        direction={isXSScreen ? 'column' : 'row'}
                        alignItems={isXSScreen ? 'center' : 'stretch'}
                    >
                        {projects?.map((project: IProject) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={project.id}
                                sx={{
                                    width: {
                                        sx: '100%',
                                        sm: '50%',
                                        md: '33.33%',
                                        lg: '25%',
                                    },
                                    minWidth: '200px',
                                }}
                            >
                                <Accordion key={project.id}>
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
                                                {project.projectCategory}
                                            </Typography>
                                            <Typography>
                                                {project.projectTitle}
                                            </Typography>
                                        </Breadcrumbs>
                                        <Typography>
                                            {project.status}
                                        </Typography>
                                        <Tooltip title="Edit">
                                            <IconButton
                                                onClick={() => {
                                                    openProjectForm(project)
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                onClick={() =>
                                                    handleDelete(project.id)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {project.description}
                                        </Typography>
                                        <Typography>
                                            Due Date:{' '}
                                            {project.dueDate?.toLocaleString(
                                                'en-US',
                                                {
                                                    year: 'numeric',
                                                    month: 'numeric',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    second: 'numeric',
                                                },
                                            ) || ''}
                                        </Typography>
                                        <Typography>
                                            Created:{' '}
                                            {project.created_at.toLocaleString()}
                                        </Typography>
                                        <Typography>
                                            Last Edited:{' '}
                                            {project.updated_at.toLocaleString() ||
                                                ''}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default MyProjects
