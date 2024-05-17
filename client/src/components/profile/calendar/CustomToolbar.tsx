import React, { FC } from 'react'
import { ToolbarProps as BaseToolbarProps, View } from 'react-big-calendar'
import { Button, IconButton } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface ToolbarProps extends BaseToolbarProps<object, object> {}

interface Messages {
    today: string
    previous: string
    next: string
    month: string
    week: string
    day: string
    agenda: string
    date: string
    time: string
    event: string
    allDay: string
    work_week: string
    yesterday: string
    tomorrow: string
    noEventsInRange: string
    showMore: (count: number) => string
}

const CustomToolbar: FC<ToolbarProps> = ({
    label,
    onNavigate,
    onView,
    views,
    view,
    localizer,
}) => {
    const goToBack = () => {
        if (onNavigate) {
            onNavigate('PREV')
        }
    }

    const goToNext = () => {
        if (onNavigate) {
            onNavigate('NEXT')
        }
    }

    const goToToday = () => {
        if (onNavigate) {
            onNavigate('TODAY')
        }
    }

    const changeView = (newView: View) => {
        if (onView) {
            onView(newView)
        }
    }

    const viewNameToMessageKey = (
        viewName: string,
    ): keyof Messages | undefined => {
        switch (viewName) {
            case 'month':
            case 'week':
            case 'day':
            case 'agenda':
            case 'work_week':
                return viewName
            default:
                return undefined
        }
    }

    return (
        <div className="rbc-toolbar">
            <div className="rbc-btn-group">
                <IconButton onClick={goToBack}>
                    <ChevronLeftIcon />
                </IconButton>
                <Button type="button" onClick={goToToday}>
                    {localizer.messages.today}
                </Button>
                <IconButton onClick={goToNext}>
                    <ChevronRightIcon />
                </IconButton>
            </div>
            <div className="rbc-toolbar-label">{label}</div>
            <div className="rbc-btn-group">
                {Object.values(views).map((viewName) => {
                    const messageKey = viewNameToMessageKey(viewName)

                    if (!messageKey || !localizer.messages[messageKey]) {
                        return null
                    }

                    const message = localizer.messages[messageKey]

                    const messageText =
                        typeof message === 'function' ? message(0) : message

                    return (
                        <button
                            type="button"
                            key={viewName}
                            onClick={() => changeView(viewName as View)}
                            className={view === viewName ? 'rbc-active' : ''}
                        >
                            {messageText}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default CustomToolbar
