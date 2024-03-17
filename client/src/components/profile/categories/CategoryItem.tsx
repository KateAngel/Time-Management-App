// CategoryCard.tsx
import React, { useState } from 'react'
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from '@mui/material'
import { ICategory } from '../../../redux/api/types'
import ItemActionsMenu from '../ItemActionsMenu'

interface CategoryItemProps {
    category: ICategory
    onEdit: () => void
    onDelete: () => void
}

const CategoryItem: React.FC<CategoryItemProps> = ({
    category,
    onEdit,
    onDelete,
}) => {
    const [expanded, setExpanded] = useState(false)

    const toggleDescription = () => {
        setExpanded(!expanded)
    }

    return (
        <Card
            variant="outlined"
            sx={{
                minWidth: '200px',
                borderRadius: 0,
                position: 'relative',
            }}
        >
            <CardActionArea
                onClick={toggleDescription}
                sx={{
                    height: '100%',
                    minHeight: 270,
                }}
            >
                <CardHeader
                    title={category.projectCategory}
                    subheader={new Date(category.created_at).toLocaleString(
                        'en-US',
                        {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                        },
                    )}
                    sx={{
                        height: 110,
                        alignItems: 'flex-start',
                        '& .MuiCardHeader-title': {
                            fontSize: 20,
                            fontWeight: 800,
                        },
                        '& .MuiCardHeader-subheader': {
                            fontSize: 12,
                            textTransform: 'uppercase',
                        },
                    }}
                />
                <Divider
                    variant="middle"
                    textAlign="right"
                    sx={{
                        my:
                            new Date(category.created_at)
                                .toISOString()
                                .slice(0, 16) ===
                            new Date(category.updated_at)
                                .toISOString()
                                .slice(0, 16)
                                ? '8px'
                                : '0',
                    }}
                >
                    {new Date(category.created_at)
                        .toISOString()
                        .slice(0, 16) ===
                    new Date(category.updated_at).toISOString().slice(0, 16) ? (
                        ''
                    ) : (
                        <Typography
                            variant="body2"
                            color="secondary.main"
                            fontSize={12}
                        >
                            Edited:{' '}
                            {new Date(category.updated_at).toLocaleString(
                                'en-US',
                                {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit',
                                },
                            )}
                        </Typography>
                    )}
                </Divider>
                <CardContent
                    sx={
                        {
                            //position: 'relative',
                        }
                    }
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{
                            flex: '1 1 auto',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: expanded ? 'none' : 4,
                        }}
                    >
                        {category.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ p: 0 }}>
                <ItemActionsMenu onEdit={onEdit} onDelete={onDelete} />
                {expanded ? (
                    <Button
                        size="small"
                        onClick={toggleDescription}
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                        }}
                    >
                        Read Less
                    </Button>
                ) : (
                    <Button
                        size="small"
                        onClick={toggleDescription}
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                        }}
                    >
                        Read More
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default CategoryItem
