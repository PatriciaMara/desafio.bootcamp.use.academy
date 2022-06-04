import { Request, Response } from "express";
import { CreateCategoryDto } from "../dtos/category/create-category.dto";
import { CreatedCategoryDto } from "../dtos/category/created-category.dto";
import { UpdateCategoryDto } from "../dtos/category/update-category.dto";
import { UpdateProductDto } from "../dtos/product/update-product.dto";
import { CategoryService } from "../services/category.service";
import { HttpStatus } from "../utils/enums/http-status.enum";

interface CreateCategoryBody extends Request {
  body: CreateCategoryDto;
}

interface UpdateCategoryBody extends Request {
  body: Partial<UpdateProductDto>;
}

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async getAll(request: Request, response: Response) {
    const categories = await this.categoryService.getAll();
    return response.status(HttpStatus.OK).json(categories);
  }

  async create({body:{name}}:CreateCategoryBody, response: Response): Promise<Response<CreatedCategoryDto>> {
    const createdCategory = await this.categoryService.create({name});
    return response.status(HttpStatus.CREATED).json(createdCategory);
  }

  async show({ params }: Request, response: Response) {
    const category = this.categoryService.show(params.id);
    return response.status(HttpStatus.OK).json(category);
  }

  async update({params, body}: Request, response: Response): Promise<Response<UpdateCategoryDto>>{
    const category = await this.categoryService.update(params.id, body.name);
    return response.status(HttpStatus.NO_CONTENT).json(category);
  }
  
  async delete({params}: Request, response: Response){
    const category = await this.categoryService.delete(params.id);
    return response.status(HttpStatus.NO_CONTENT).json(category);
  }
}