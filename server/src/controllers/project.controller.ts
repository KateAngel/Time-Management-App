import { NextFunction, Request, Response } from 'express';
import {
  CreateProjectInput,
  DeleteProjectInput,
  GetProjectInput,
  UpdateProjectInput,
} from '../schemas/project.schema';
import { createProject, findProjects, getAllProjects, getProject } from '../services/project.service';
import { findUserById } from '../services/user.service';
import AppError from '../utils/appError';


export const createProjectHandler = async (
  req: Request<{}, {}, CreateProjectInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(res.locals.user.id as string);
      console.log('req.body:', req.body);
    const project = await createProject(req.body, user!);

    res.status(201).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Project with that title already exist',
      });
    }
    console.log(err);
    next(err);
  }
};

export const getProjectHandler = async (
  req: Request<GetProjectInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await getProject(parseInt(req.params.projectId));

    if (!project) {
      return next(new AppError(404, 'Project with that ID not found'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllProjectsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await getAllProjects();

    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: {
        projects,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getProjectsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await findProjects({}, {}, {});

    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: {
        projects,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateProjectHandler = async (
  req: Request<UpdateProjectInput['params'], {}, UpdateProjectInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await getProject(parseInt(req.params.projectId));

    if (!project) {
      return next(new AppError(404, 'Project with that ID not found'));
    }

    Object.assign(project, req.body);

    const updatedProject = await project.save();

    res.status(200).json({
      status: 'success',
      data: {
        post: updatedProject,
      },
    });
  } catch (err: any) {
    next(err);
    console.log(err);
  }
};

export const deleteProjectHandler = async (
  req: Request<DeleteProjectInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await getProject(parseInt(req.params.projectId));

    if (!project) {
      return next(new AppError(404, 'Project with that ID not found'));
    }

    await project.remove();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};