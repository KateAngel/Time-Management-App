export interface IUser {
    email: string
    role: string
    id: string
    name: string
    age: number
    created_at: Date
    updated_at: Date
    __v: number
}

export interface IGenericResponse {
    status: string
    message: string
}
