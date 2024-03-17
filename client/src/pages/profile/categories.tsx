// categories.tsx
import { useState, useEffect } from 'react'
import { Box, Container, Divider, Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { toast } from 'react-toastify'

import FullScreenLoader from '../../components/FullScreenLoader'
import ActionButtons from '../../components/profile/ActionButtons'
import DeleteConfirmationDialog from '../../components/profile/DeleteConfirmationDialog'
import CategoryItem from '../../components/profile/categories/CategoryItem'
import CategoryForm from '../../components/profile/categories/CategoryForm'
import { ICategory } from '../../redux/api/types'
import {
    useGetAllCategoriesQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} from '../../redux/api/categoryApi'
import { TabTitleTypography } from '../../styles/profile.styles'

const ProjectCategories = () => {
    const theme = useTheme()

    const isXSScreen = useMediaQuery(theme.breakpoints.down('xs'))

    const {
        isLoading,
        isError,
        error,
        data: categories,
    } = useGetAllCategoriesQuery()

    const [addCategory] = useAddCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    const [showCategoryForm, setShowCategoryForm] = useState<boolean>(false)

    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
        null,
    )

    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)

    const [filterText, setFilterText] = useState<string>('')
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const openCategoryForm = (category: ICategory | null = null) => {
        setSelectedCategory(category || null)
        setShowCategoryForm(true)
    }

    const closeCategoryForm = () => {
        setShowCategoryForm(false)
        setSelectedCategory(null)
    }

    const handleSaveCategory = (editedCategory: ICategory) => {
        const now = new Date()
        editedCategory.updated_at = now

        if (selectedCategory) {
            updateCategory(editedCategory)
        } else {
            addCategory(editedCategory)
        }

        closeCategoryForm()
    }

    const handleDelete = (categoryId: number) => {
        setSelectedCategory(
            categories?.find((category) => category.id === categoryId) || null,
        )

        setDeleteConfirmation(true)
    }

    const handleConfirmDelete = () => {
        deleteCategory(selectedCategory!.id)
        setDeleteConfirmation(false)
    }

    const handleCancelDelete = () => {
        setDeleteConfirmation(false)
    }

    const filterCategories = (text: string, selectedFilters: string[]) => {
        setFilterText(text)
        setSelectedFilters(selectedFilters)
    }

    const filteredCategories = categories?.filter((category) => {
        const matchesFilterText =
            category.projectCategory
                .toLowerCase()
                .includes(filterText.toLowerCase()) ||
            category.description
                .toLowerCase()
                .includes(filterText.toLowerCase())

        const matchesFilters =
            selectedFilters.length === 0 ||
            selectedFilters.some((filter) =>
                category.projectCategory.includes(filter),
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
                <TabTitleTypography>Categories</TabTitleTypography>
                <ActionButtons
                    openForm={() => openCategoryForm()}
                    filterItems={filterCategories}
                    filterOptions={
                        categories?.map(
                            (category) => category.projectCategory,
                        ) || []
                    }
                    tooltipTitle="Add Category"
                />
                {showCategoryForm && (
                    <CategoryForm
                        category={selectedCategory || undefined}
                        onSave={(editedCategory) =>
                            handleSaveCategory(editedCategory)
                        }
                        onCancel={closeCategoryForm}
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
                        {filteredCategories &&
                            filteredCategories.length > 0 &&
                            [...filteredCategories]
                                .sort((a, b) =>
                                    a.projectCategory.localeCompare(
                                        b.projectCategory,
                                    ),
                                )
                                .map((category: ICategory) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        key={category.id}
                                    >
                                        <CategoryItem
                                            category={category}
                                            onEdit={() =>
                                                openCategoryForm(category)
                                            }
                                            onDelete={() =>
                                                handleDelete(category.id)
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

export default ProjectCategories
