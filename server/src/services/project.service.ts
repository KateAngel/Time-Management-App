import {
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
} from 'typeorm'
import { Project } from '../entities/project.entity'
import { AppDataSource } from '../utils/data-source'

const projectRepository = AppDataSource.getRepository(Project)

export const createProject = async (project: Partial<Project>) => {
    return await projectRepository.save(projectRepository.create(project));
}

export const getProject = async (projectId: number) => {
    const project = await projectRepository.findOne({
        where: { id: projectId },
        relations: ['category'],
    })

    return project
    // const projectData = await projectRepository
    //         .createQueryBuilder("project")
    //         .leftJoinAndSelect("project.category", "category")
    //         .where("project.id = :projectId", { projectId })
    //         .findOne();

    // // Check if projectData is null
    // if (!projectData) {
    //     return { status: 'fail', message: 'Project not found' };
    // }

    // // Format the project data
    // const project = {
    //     id: projectData.id,
    //     project: projectData.project,
    //     description: projectData.description,
    //     status: projectData.status,
    //     dueDate: projectData.dueDate,
    //     created_at: projectData.created_at,
    //     updated_at: projectData.updated_at,
    //   category: projectData.category
    // };
    // return project;
}

export const getAllProjects = async () => {
    return await projectRepository.find({ relations: ['category'] })
}

export const findProjects = async (
    where: FindOptionsWhere<Project> = {},
    select: FindOptionsSelect<Project> = {},
    relations: FindOptionsRelations<Project> = {}
) => {
    return await projectRepository.find({
        where,
        select,
        relations,
    })
}
