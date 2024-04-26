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
    const project = projectRepository.create({ ...input, user });
    return await projectRepository.save(project);
    //return await projectRepository.save(projectRepository.create({ ...input, user }));
  }
  
  export const getProject  = async (projectId: number) => {

    const project = await projectRepository.findOne({ where: { id: projectId }, relations: [ 'category' ]});

    return project;
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
    //     projectTitle: projectData.projectTitle,
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
    return await projectRepository.find({ relations: [ 'category' ] })
  }

  export const findProjects = async (
    where: FindOptionsWhere<ProjectTitle > = {},
    select: FindOptionsSelect<ProjectTitle > = {},
    relations: FindOptionsRelations<ProjectTitle > = {}
  ) => {
    return await projectRepository.find({
      where,
      select,
      relations: [ 'category' ],
    })
  //   const projectsData = await projectRepository
  //   .createQueryBuilder("project")
  //   .leftJoinAndSelect("project.category", "category")
  //   .where(where)
  //   .getMany();

  // // Format the projects data
  // const projects = projectsData.map(projectData => ({
  //   id: projectData.id,
  //   projectTitle: projectData.projectTitle,
  //   description: projectData.description,
  //   status: projectData.status,
  //   dueDate: projectData.dueDate,
  //   created_at: projectData.created_at,
  //   updated_at: projectData.updated_at,
  //   category: projectData.category
  // }));

  //return projects;
  }