// MyCalendar.tsx
import React, { useState, useEffect } from 'react'
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    //CardHeader,
    Container,
    Divider,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DateTime } from 'luxon'
import { TabTitleTypography } from '../../styles/profile.styles'
import EventCalendarLuxon from '../../components/profile/calendar/EventCalendarLuxon'
import {
    useAddEventMutation,
    useUpdateEventMutation,
} from '../../redux/api/eventApi'
import { IEvent, ITask } from '../../redux/api/types'
import EventForm from '../../components/profile/calendar/EventForm'
//import TaskForm from '../../components/profile/toDoList/TaskForm'

const MyCalendar = () => {
    const theme = useTheme()

    const [addEvent] = useAddEventMutation()
    const [updateEvent] = useUpdateEventMutation()

    const [showEventForm, setShowEventForm] = useState<boolean>(false)
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null)
    const [startDate, setStartDate] = useState<DateTime | null>(DateTime.now())
    const [endDate, setEndDate] = useState<DateTime | null>(DateTime.now())

    const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
        openEventForm(null, start, end)
    }

    const openEventForm = (
        event: IEvent | null = null,
        start: Date | null = null,
        end: Date | null = null,
    ) => {
        setSelectedEvent(event)

        if (start) {
            setStartDate(DateTime.fromJSDate(start))
        }

        if (end) {
            setEndDate(DateTime.fromJSDate(end))
        }

        setShowEventForm(true)
    }

    const closeEventForm = () => {
        setShowEventForm(false)
        setSelectedEvent(null)
    }

    const handleSaveEvent = async (event: IEvent) => {
        const now = DateTime.now()
        event.updated_at = now

        if (selectedEvent) {
            // Update event
            await updateEvent(event)
        } else {
            // Add new event
            await addEvent(event)
        }

        closeEventForm()
    }

    // const [showTaskForm, setShowTaskForm] = useState<boolean>(false)
    // const [selectedTask, setSelectedTask] = useState<ITask | null>(null)

    return (
        <Container maxWidth="lg">
            <Box>
                <TabTitleTypography>Calendar</TabTitleTypography>
                <Card variant="outlined" sx={{ borderRadius: 0 }}>
                    {/* <CardHeader
                        title="Calendar"
                        subheader="Create Events and Todos and manage them easily"
                    />
                    <Divider /> */}
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <ButtonGroup
                                size="large"
                                variant="contained"
                                aria-label="outlined primary button group"
                            >
                                <Button
                                    onClick={() => openEventForm()}
                                    size="small"
                                    variant="contained"
                                >
                                    Add event
                                </Button>
                                {/* <Button
                                    onClick={() => setOpenTodoModal(true)}
                                    size="small"
                                    variant="contained"
                                >
                                    Create todo
                                </Button> */}
                            </ButtonGroup>
                            {showEventForm && (
                                <EventForm
                                    event={selectedEvent || undefined}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onSave={(editedEvent) =>
                                        handleSaveEvent(editedEvent)
                                    }
                                    onCancel={closeEventForm}
                                />
                            )}
                            {/* {showTaskForm && (
                                <TaskForm
                                    task={selectedTask || undefined}
                                    onSave={(editedTask) =>
                                        handleSaveTask(editedTask)
                                    }
                                    onCancel={closeTaskForm}
                                />
                            )} */}
                        </Box>
                        <Divider style={{ margin: 10 }} />
                        <EventCalendarLuxon
                            onSelectEvent={(event: IEvent) =>
                                openEventForm(event)
                            }
                            onSelectSlot={({
                                start,
                                end,
                            }: {
                                start: Date
                                end: Date
                            }) => handleSelectSlot({ start, end })}
                        />
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}

export default MyCalendar
