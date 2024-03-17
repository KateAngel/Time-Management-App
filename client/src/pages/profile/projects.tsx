// MyProjects.tsx
import { useState, useEffect } from 'react'
import { Box, Container, Divider, Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { toast } from 'react-toastify'
import { DateTime } from 'luxon'
import FullScreenLoader from '../../components/FullScreenLoader'
import ActionButtons from '../../components/profile/ActionButtons'
import DeleteConfirmationDialog from '../../components/profile/DeleteConfirmationDialog'
import ProjectForm from '../../components/profile/projects/ProjectForm'
import ProjectItem from '../../components/profile/projects/ProjectItem'
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

    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)

    const [filterText, setFilterText] = useState<string>('')
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const openProjectForm = (project: IProject | null = null) => {
        setSelectedProject(project)
        setShowProjectForm(true)
    }

    const closeProjectForm = () => {
        setShowProjectForm(false)
        setSelectedProject(null)
    }

    const handleSaveProject = (editedProject: IProject) => {
        const now = DateTime.now()
        editedProject.updated_at = now

        if (selectedProject) {
            updateProject(editedProject)
        } else {
            addProject(editedProject)
        }

        closeProjectForm()
    }

    const handleDelete = (projectId: number) => {
        setSelectedProject(
            projects?.find((project) => project.id === projectId) || null,
        )

        setDeleteConfirmation(true)
    }

    const handleConfirmDelete = () => {
        deleteProject(selectedProject!.id)
        setDeleteConfirmation(false)
    }

    const handleCancelDelete = () => {
        setDeleteConfirmation(false)
    }

    const filterProjects = (text: string, selectedFilters: string[]) => {
        setFilterText(text)
        setSelectedFilters(selectedFilters)
    }

    const filteredProjects = projects?.filter((project) => {
        const matchesFilterText =
            project.projectTitle
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
            project.description.toLowerCase().includes(filterText.toLowerCase())

        const matchesFilters =
            selectedFilters.length === 0 ||
            selectedFilters.some((filter) =>
                project.projectTitle.includes(filter),
            )

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
                <TabTitleTypography>Projects</TabTitleTypography>
                <ActionButtons
                    openForm={() => openProjectForm()}
                    filterItems={filterProjects}
                    filterOptions={
                        projects?.map((project) => project.projectTitle) || []
                    }
                    tooltipTitle="Add Project"
                />
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
                        {filteredProjects &&
                            filteredProjects.length > 0 &&
                            [...filteredProjects]
                                .sort((a, b) =>
                                    a.projectTitle.localeCompare(
                                        b.projectTitle,
                                    ),
                                )
                                .map((project: IProject) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        key={project.id}
                                    >
                                        <ProjectItem
                                            project={project}
                                            onEdit={() =>
                                                openProjectForm(project)
                                            }
                                            onDelete={() =>
                                                handleDelete(project.id)
                                            }
                                        />
                                    </Grid>
                                ))}
                    </Grid>
                </Box>
            </Box>
            <DeleteConfirmationDialog
                open={deleteConfirmation}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </Container>
    )
}

export default MyProjects
