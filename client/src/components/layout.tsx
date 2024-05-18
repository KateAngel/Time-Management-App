import { Outlet } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
    return (
        <div id="root">
            <CssBaseline />
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout
