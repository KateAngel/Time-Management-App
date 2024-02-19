import { number, object, string, TypeOf, z } from 'zod'
import { RoleEnumType } from '../entities/user.entity'

export const createUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: string({
            required_error: 'Password is required',
        })
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters'),
        passwordConfirm: string({
            required_error: 'Please confirm your password',
        }),
        role: z.optional(z.nativeEnum(RoleEnumType)),
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match',
    }),
})

export const editUserSchema = object({
    body: object({
        name: string(),
        age: number({invalid_type_error: "Age must be a number"}).lte(100).gt(5),
    }),
})

export const loginUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email address is required',
        }).email('Invalid email address'),
        password: string({
            required_error: 'Password is required',
        }).min(8, 'Invalid email or password'),
    }),
})

export const verifyEmailSchema = object({
    params: object({
        verificationCode: string(),
    }),
})

export type CreateUserInput = Omit<
    TypeOf<typeof createUserSchema>['body'],
    'passwordConfirm'
>

export type EditUserInput = TypeOf<typeof editUserSchema>['body']

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body']
export type VerifyEmailInput = TypeOf<typeof verifyEmailSchema>['params']
