import React from 'react'
import { useCookies } from 'react-cookie'
import FullScreenLoader from '../components/FullScreenLoader'
import { userApi } from '../redux/api/userApi'

type AuthMiddlewareProps = {
    children: React.ReactElement
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
    const [cookies] = useCookies(['logged_in'])

    const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
        skip: !!cookies.logged_in,
    })

    console.log(cookies.logged_in)

    const loading = isLoading || isFetching

    if (loading) {
        return <FullScreenLoader />
    }

    return children
}

export default AuthMiddleware
