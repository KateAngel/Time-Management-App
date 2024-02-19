import { NextFunction, Request, Response } from 'express';
import {
  CreateTaskInput,
  DeleteTaskInput,
  GetTaskInput,
  UpdateTaskInput,
} from '../schemas/task.schema';
import { createTask, findTasks, getTask } from '../services/task.service';
import { findUserById } from '../services/user.service';
import AppError from '../utils/appError';


export const createTaskHandler = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id as string);

    const task = await createTask(req.body, user!);

    res.status(201).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Task with that title already exist',
      });
    }
    next(err);
  }
};

export const getTaskHandler = async (
  req: Request<GetTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await getTask(req.params.taskId);

    if (!task) {
      return next(new AppError(404, 'Task with that ID not found'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getTasksHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await findTasks({}, {}, {});

    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateTaskHandler = async (
  req: Request<UpdateTaskInput['params'], {}, UpdateTaskInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await getTask(req.params.taskId);

    if (!task) {
      return next(new AppError(404, 'Task with that ID not found'));
    }

    Object.assign(task, req.body);

    const updatedTask = await task.save();

    res.status(200).json({
      status: 'success',
      data: {
        post: updatedTask,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteTaskHandler = async (
  req: Request<DeleteTaskInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await getTask(req.params.taskId);

    if (!task) {
      return next(new AppError(404, 'Task with that ID not found'));
    }

    await task.remove();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};