import config from 'config'
import { User } from '../entities/user.entity'
import { CreateUserInput, EditUserInput } from '../schemas/user.schema'
import { AppDataSource } from '../utils/data-source'
import redisClient from '../utils/connectRedis'
import { signJwt } from '../utils/jwt'

const userRepository = AppDataSource.getRepository(User)

export const createUser = async (input: CreateUserInput) => {
    return (await AppDataSource.manager.save(
        AppDataSource.manager.create(User, input)
    )) as User
}

export const findUserByEmail = async ({ email }: { email: string }) => {
    return await userRepository.findOneBy({ email })
}

export const findUserById = async (userId: string) => {
    return await userRepository.findOneBy({ id: userId })
}

export const findUser = async (query: Object) => {
    return await userRepository.findOneBy(query)
}

export const editUser = async (userId: string, input: EditUserInput) => {
    const userToUpdate = await userRepository.findOneBy({ id: userId })
    if (!userToUpdate) {
        throw new Error(`User with ID ${userId} not found`);
    }
    if (input.name) {
        userToUpdate.name = input.name;
    }
    if (input.age) {
        userToUpdate.age = input.age;
    }

    await AppDataSource.manager.save(userToUpdate);

    return userToUpdate;
}

// ? Sign access and Refresh Tokens
export const signTokens = async (user: User) => {
    // 1. Create Session
    redisClient.set(user.id, JSON.stringify(user), {
        EX: config.get<number>('redisCacheExpiresIn') * 60,
    })

    // 2. Create Access and Refresh tokens
    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
        expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    })

    const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
        expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
    })

    return { access_token, refresh_token }
}
