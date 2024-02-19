import { CssBaseline } from '@mui/material'
import {
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
import useMediaQuery from '@mui/material/useMediaQuery'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from './components/layout'
import RequireUser from './components/requireUser'

import AdminPage from './pages/admin.page'
import HomePage from './pages/home.page'
import LoginPage from './pages/login.page'
import ProfileInfo from './pages/profile/profile.info.page'
import ProfilePage from './pages/profile/profile.page'
import Dashbord from './pages/profile/dashboard'
import MyCalendar from './pages/profile/myCalendar'
import ProjectCategories from './pages/profile/categories'
import MyProjects from './pages/profile/projects'
import ToDoList from './pages/profile/toDoList'
import RegisterPage from './pages/register.page'
import UnauthorizePage from './pages/unauthorize.page'
import EmailVerificationPage from './pages/verifyemail.page'

import DesignPage from './styles/theme/design'
import { getDesignTokens, getThemedComponents } from './styles/theme/theme'
import { ColorModeContext } from './config/color-context'

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [mode, setMode] = React.useState<'dark' | 'light'>('dark')

    React.useEffect(() => {
        setMode(prefersDarkMode ? 'dark' : 'light')
    }, [prefersDarkMode])

    const colorMode = React.useMemo(
        () => ({
            switchColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
            },
        }),
        [],
    )

    let theme = React.useMemo(
        () =>
            createTheme(
                deepmerge(getDesignTokens(mode), getThemedComponents(mode)),
            ),
        [mode],
    )

    theme = responsiveFontSizes(theme)

    return (
        <>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                        <CssBaseline />
                        <ToastContainer />
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<HomePage />} />
                                <Route path="design" element={<DesignPage />} />
                                {/* Private Route */}
                                <Route
                                    element={
                                        <RequireUser
                                            allowedRoles={['user', 'admin']}
                                        />
                                    }
                                >
                                    <Route
                                        path="my-profile"
                                        element={<ProfilePage />}
                                    >
                                        <Route
                                            path="dashboard"
                                            element={<Dashbord />}
                                        />
                                        <Route
                                            path="profile-info"
                                            element={<ProfileInfo />}
                                        />
                                        <Route
                                            path="categories"
                                            element={<ProjectCategories />}
                                        />
                                        <Route
                                            path="projects"
                                            element={<MyProjects />}
                                        />
                                        <Route
                                            path="to-do-list"
                                            element={<ToDoList />}
                                        />
                                        <Route
                                            path="calendar"
                                            element={<MyCalendar />}
                                        />
                                    </Route>
                                </Route>
                                <Route
                                    element={
                                        <RequireUser allowedRoles={['admin']} />
                                    }
                                >
                                    <Route
                                        path="admin"
                                        element={<AdminPage />}
                                    />
                                </Route>
                                <Route
                                    path="unauthorized"
                                    element={<UnauthorizePage />}
                                />
                            </Route>
                            <Route
                                path="verifyemail"
                                element={<EmailVerificationPage />}
                            >
                                <Route
                                    path=":verificationCode"
                                    element={<EmailVerificationPage />}
                                />
                            </Route>
                            <Route path="login" element={<LoginPage />} />
                            <Route path="register" element={<RegisterPage />} />
                        </Routes>
                    </LocalizationProvider>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>
    )
}

export default App
