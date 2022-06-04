import { Request, Response } from "express"
import { CreatedProductDto } from '../dtos/product/created-product.dto';
import { ProductService } from '../services/product.service';
import { HttpStatus } from '../utils/enums/http-status.enum'

export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  async getAll(request: Request, response: Response): Promise<Response<CreatedProductDto>> {
    const products = await this.productService.getAll();
    return response.status(HttpStatus.OK).json(products);
  }

  async create({body, file}:Request, resquest: Response): Promise<Response<CreatedProductDto>> {
    const createdProduct = await this.productService.create({...body, 
      image:file?.filename,
      disponibility: body.disponibility === "true" ? true : false,
    });
    return resquest.status(HttpStatus.CREATED).json(createdProduct);
  }
  
  async show({params}: Request, response: Response){
    const product = await this.productService.show(params.id);
    return response.status(HttpStatus.OK).json(product)
  }

  async update({params, body}: Request, response: Response){
    const product = await this.productService.update(params.id, body);
    return response.status(HttpStatus.NO_CONTENT).json(product);
  }

  async delete({params}: Request, response: Response){
    const product = await this.productService.delete(params.id);
    return response.status(HttpStatus.NO_CONTENT).json(product);
  }
}