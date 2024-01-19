import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  asynccreate() {
    return this.categoryService.create();
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}
