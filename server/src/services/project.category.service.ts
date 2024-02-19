import {
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
    Relation,
    RelationOptions,
  } from 'typeorm';
  import { ProjectCategory } from '../entities/project.category.entity';
  import { User } from '../entities/user.entity';
  import { AppDataSource } from '../utils/data-source';
  
  const categoryRepository = AppDataSource.getRepository(ProjectCategory);
  
  export const createCategory = async (input: Partial<ProjectCategory>, user: User) => {
    return await categoryRepository.save(categoryRepository.create({ ...input, user }));
  };
  
  export const getCategory  = async (categoryId: number) => {
    return await categoryRepository.findOneBy({ id: categoryId });
  };
  
  export const getAllCategories = async () => {
    return await categoryRepository.find();
  }

  // export const updateCategory = async (categoryId: number, input: Partial<ProjectCategory>) => {
  //   return await categoryRepository.update(categoryId, input);
  // };

  // export const deleteCategory = async (categoryId: number) => {
  //   return await categoryRepository.delete(categoryId);
  // };