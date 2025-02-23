import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category';
import { UpdateCategoryDto } from './dto/update-category';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = await this.categoriesRepository.save(createCategoryDto);
    return newCategory;
  }

  async findAll(): Promise<Category[]> {
    const allCategories = await this.categoriesRepository.find();
    return allCategories;
  }

  async findOne(id: number): Promise<Category> {
    const category = this.categoriesRepository.findOne({ id });
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    await this.categoriesRepository.update(id, updateCategoryDto);
    return this.categoriesRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    const deleteResult = this.categoriesRepository.delete(id);
    return deleteResult;
  }
}
