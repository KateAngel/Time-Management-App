import {
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
    Relation,
    RelationOptions,
  } from 'typeorm';
  import { ProjectTitle } from '../entities/project.entity'
  import { User } from '../entities/user.entity'
  import { AppDataSource } from '../utils/data-source'
  
  const projectRepository = AppDataSource.getRepository(ProjectTitle )
  
  export const createProject = async (input: Partial<ProjectTitle >, user: User) => {
    return await projectRepository.save(projectRepository.create({ ...input, user }));
  }
  
  export const getProject  = async (projectId: number) => {
    return await projectRepository.findOneBy({ id: projectId })
  }
  
  export const findProjects = async (
    where: FindOptionsWhere<ProjectTitle > = {},
    select: FindOptionsSelect<ProjectTitle > = {},
    relations: FindOptionsRelations<ProjectTitle > = {}
  ) => {
    return await projectRepository.find({
      where,
      select,
      relations,
    })
  }