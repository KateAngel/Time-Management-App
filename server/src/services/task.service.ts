import {
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
  } from 'typeorm';
  import { Task } from '../entities/task.entity'
  import { User } from '../entities/user.entity'
  import { AppDataSource } from '../utils/data-source'

  const taskRepository = AppDataSource.getRepository(Task )

  export const createTask = async (task: Partial<Task>) => {
    return await taskRepository.save(taskRepository.create(task))
  };

  export const getTask  = async (taskId: string) => {
    return await taskRepository.findOne({ where: { id: taskId }, relations: [ 'project', 'project.category' ] })
  };

  export const getAllTasks = async () => {
    return await taskRepository.find({ relations: [ 'project', 'project.category' ] })
  }

  export const findTasks = async (
    where: FindOptionsWhere<Task > = {},
    select: FindOptionsSelect<Task > = {},
    relations: FindOptionsRelations<Task > = {}
  ) => {
    return await taskRepository.find({
      where,
      select,
      relations: [ 'project', 'project.category' ],
    })
  }