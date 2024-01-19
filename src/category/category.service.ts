import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { categories } from 'data/data'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}
  async create() {
    return this.categoryRepo.save(categories)
  }

  async findAll() {
    return await this.categoryRepo.find()
  }
}
