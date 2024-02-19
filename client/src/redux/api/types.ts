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

export interface ITask {
    id: number
    title: string
    description?: string
    createdDate: Date
    lastModifiedDate?: Date
    dueDate?: Date
    status: string
    projectCategory: string
    projectTitle: string
}

export interface IProject {
    id: number
    projectTitle: string
    description: string
    status: string
    dueDate?: Date
    created_at: Date
    updated_at: Date
    projectCategory: string
}

export interface ICategory {
    id: number
    projectCategory: string
    description: string
    created_at: Date
    updated_at: Date
}
