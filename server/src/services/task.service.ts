import {
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
    Relation,
    RelationOptions,
  } from 'typeorm';
  import { Task } from '../entities/task.entity';
  import { User } from '../entities/user.entity';
  import { AppDataSource } from '../utils/data-source';
  
  const taskRepository = AppDataSource.getRepository(Task );
  
  export const createTask = async (input: Partial<Task >, user: User) => {
    return await taskRepository.save(taskRepository.create({ ...input, user }));
  };
  
  export const getTask  = async (taskId: string) => {
    return await taskRepository.findOneBy({ id: taskId });
  };
  
  export const findTasks = async (
    where: FindOptionsWhere<Task > = {},
    select: FindOptionsSelect<Task > = {},
    relations: FindOptionsRelations<Task > = {}
  ) => {
    return await taskRepository.find({
      where,
      select,
      relations,
    });
  };