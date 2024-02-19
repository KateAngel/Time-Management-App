// categories.tsx
import { useState, useEffect } from 'react'
import {
    Box,
    Card,
    CardActionArea,
    CardHeader,
    CardContent,
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

import FullScreenLoader from '../../components/FullScreenLoader'
import CategoryForm from '../../components/CategoryForm'
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

    const openCategoryForm = (category: ICategory | null = null) => {
        setSelectedCategory(category)
        setShowCategoryForm(true)
    }

    const closeCategoryForm = () => {
        setShowCategoryForm(false)
        setSelectedCategory(null)
    }

    const handleSaveCategory = async (editedCategory: ICategory) => {
        const now = new Date()
        editedCategory.updated_at = now

        if (selectedCategory) {
            updateCategory(editedCategory)
        } else {
            await addCategory(editedCategory)
        }

        closeCategoryForm()
    }

    const handleDelete = (categoryId: number) => {
        deleteCategory(categoryId)
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
                <TabTitleTypography>Categories</TabTitleTypography>
                <Tooltip title="Add Category" placement="top-start">
                    <IconButton
                        onClick={() => openCategoryForm()}
                        sx={{ backgroundColor: theme.palette.secondary.main }}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
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
                        {categories?.map((category: ICategory) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={category.id}
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
                                <Card
                                    variant="outlined"
                                    sx={{ height: '100%' }}
                                >
                                    <CardActionArea>
                                        <CardHeader
                                            action={
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top-start"
                                                    >
                                                        <IconButton
                                                            onClick={() => {
                                                                openCategoryForm(
                                                                    category,
                                                                )
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip
                                                        title="Delete"
                                                        placement="top-start"
                                                    >
                                                        <IconButton
                                                            onClick={() =>
                                                                handleDelete(
                                                                    category.id,
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            }
                                            title={category.projectCategory}
                                            subheader={
                                                <>
                                                    Created: <br />
                                                    {new Date(
                                                        category.created_at,
                                                    ).toLocaleString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: '2-digit',
                                                    })}
                                                </>
                                            }
                                            sx={{
                                                '& .MuiCardHeader-title': {
                                                    fontSize: 32,
                                                },
                                                '& .MuiCardHeader-subheader': {
                                                    fontSize: 12,
                                                },
                                            }}
                                        />
                                        <Divider variant="middle" />
                                        <CardContent>
                                            <Typography
                                                minHeight={75}
                                                variant="body2"
                                                //color="text.secondary"
                                            >
                                                {category.description}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                fontSize={12}
                                                textAlign="right"
                                            >
                                                Last Edited:{' '}
                                                {new Date(
                                                    category.updated_at,
                                                ).toLocaleString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: '2-digit',
                                                })}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default ProjectCategories
