// TaskForm.tsx
import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Tooltip,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import { LoadingButton } from '@mui/lab'
import { DateTime } from 'luxon'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import CancelIcon from '@mui/icons-material/Cancel'
import { object, string, TypeOf } from 'zod'
import { IEvent } from '../../../redux/api/types'
import { generateUUID } from '../../../Helpers/uuidGenerator'
import { eventStatus } from '../../../Helpers/status'

const eventSchema = object({
    title: string()
        .min(1, 'Title is required')
        .max(250, 'Title must not exceed 250 characters'),
})

export type EventFormData = TypeOf<typeof eventSchema>
interface EventFormProps {
    event?: IEvent
    onSave: (editedEvent: IEvent) => void
    onCancel: () => void
    startDate?: DateTime | null
    endDate?: DateTime | null
}

const EventForm: React.FC<EventFormProps> = ({
    event,
    onSave,
    onCancel,
    startDate,
    endDate,
}) => {
    const theme = useTheme()

    const [editedEvent, setEditedEvent] = useState<IEvent>(
        event || {
            id: generateUUID(),
            title: '',
            description: '',
            startDate: startDate || DateTime.now(),
            endDate: endDate || DateTime.now(),
            allDay: false,
            status: eventStatus[0],
            created_at: DateTime.now(),
            updated_at: DateTime.now(),
        },
    )

    const [eventFormError, setEventFormError] = useState<boolean>(false)

    useEffect(() => {
        if (event) {
            setEditedEvent({
                ...event,
            })
        }
    }, [event])

    // useEffect(() => {
    //     console.log('editedEvent:', editedEvent)
    // }, [editedEvent])

    const handleSave = () => {
        try {
            eventSchema.parse(editedEvent)

            onSave(editedEvent)
            onCancel()
        } catch (error) {
            // Display validation error message
            setEventFormError(true)
        }
    }

    return (
        <Dialog
            open={true}
            onClose={onCancel}
            sx={{ '& .MuiDialog-paper': { maxWidth: '900px', width: '70%' } }}
        >
            <DialogTitle>{event ? 'Edit Event' : 'Add Event'}</DialogTitle>
            <IconButton
                onClick={onCancel}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
            >
                <Tooltip title="Cancel">
                    <CancelIcon />
                </Tooltip>
            </IconButton>
            <DialogContent sx={{ minWidth: '280px', flexGrow: 1 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            label="Title"
                            variant="filled"
                            multiline
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedEvent.title}
                            onChange={(e) =>
                                setEditedEvent({
                                    ...editedEvent,
                                    title: e.target.value,
                                })
                            }
                            error={eventFormError}
                            inputProps={{ maxLength: 250 }}
                        />
                        {eventFormError && (
                            <FormHelperText>
                                * Title is required. Title must not exceed 250
                                characters.
                            </FormHelperText>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            label="Description"
                            variant="filled"
                            multiline
                            minRows={4}
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedEvent.description}
                            onChange={(e) =>
                                setEditedEvent({
                                    ...editedEvent,
                                    description: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={4}>
                        <DateTimePicker
                            label="Start Date"
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedEvent.startDate}
                            onChange={(date: DateTime | null) => {
                                if (date) {
                                    setEditedEvent({
                                        ...editedEvent,
                                        startDate: date,
                                    })
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={4}>
                        <DateTimePicker
                            label="End Date"
                            sx={{
                                width: '100%',
                                '& .MuiInputBase-root': {
                                    borderRadius: 0,
                                },
                            }}
                            value={editedEvent.endDate}
                            onChange={(date: DateTime | null) => {
                                if (date) {
                                    setEditedEvent({
                                        ...editedEvent,
                                        endDate: date,
                                    })
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                value={editedEvent.status || ''}
                                onChange={(e) =>
                                    setEditedEvent({
                                        ...editedEvent,
                                        status: e.target.value ?? null,
                                    })
                                }
                                input={<OutlinedInput label="Status" />}
                            >
                                {eventStatus.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <Tooltip title="Save">
                    <LoadingButton
                        onClick={handleSave}
                        variant="contained"
                        sx={{ fontWeight: 'bold', textTransform: 'none' }}
                    >
                        Save & Submit
                    </LoadingButton>
                </Tooltip>
            </DialogActions>
        </Dialog>
    )
}

export default EventForm
