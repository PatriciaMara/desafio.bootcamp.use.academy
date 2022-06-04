import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/product/create-product.dto';
import { CreatedProductDto } from '../dtos/product/created-product.dto';
import { UpdateProductDto } from '../dtos/product/update-product.dto';
import { ProductEntity } from '../entities/product.entity';
import { HttpException } from '../handler-exceptions/http-exception.provider';
import { HttpStatus } from '../utils/enums/http-status.enum';

export class ProductService {
  private productRepository: Repository<ProductEntity>;

  constructor(private readonly connection: DataSource) {
    this.productRepository = this.connection.getRepository(ProductEntity);
  }

  async getAll(): Promise<CreatedProductDto[]> {
    try {
      const products = await this.productRepository.find({
        relations: ["category"],
      });
      return products.map((product) => new CreatedProductDto(product));
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "Houve um erro ao listar cursos!",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async create({categoryId, description, disponibility, image, name, value,}: CreateProductDto): Promise<CreatedProductDto> {
    try {
      const createproduct = this.productRepository.create({
        category: { id: categoryId },
        description,
        disponibility:
          typeof disponibility === "string" && disponibility === "true"
            ? true
            : false,
        image,
        name,
        value: Number(value),
      });
      const saveproduct = await this.productRepository.save(createproduct);
      return new CreatedProductDto(saveproduct);
    } catch (error) {
      throw new HttpException(
        "Houve um erro ao cadastrar curso!",
        HttpStatus.BAD_REQUEST
      );
    }
  }
  
  async show(id:string): Promise<CreatedProductDto> {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
      });
      if (!product){
        throw new HttpException("Produto não encontrado!", HttpStatus.NOT_FOUND);
      }
      return new CreatedProductDto(product);
    } catch (error) {
      throw new HttpException('Houve um erro ao listar produto!', HttpStatus.BAD_REQUEST,);
    }
  }

  async update(id:string, params: UpdateProductDto): Promise<void> {
    try {
      const product = await this.productRepository.findOne({
        where: {id}
      })
      if(!product) {
        throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND,)
      }
      await this.productRepository.update(id, {...product, ...params})
    } catch (error) {
      if(error instanceof HttpException) throw error;
      throw new HttpException('Houve um erro ao atualizar produtos!', HttpStatus.BAD_REQUEST,);
    }
  }

  async delete(id:string){
    try {
      const products = await this.productRepository.delete(id)
      return products;
    } catch (error) {
      throw new HttpException('Houve um erro ao deletar o produto!', HttpStatus.BAD_REQUEST,);
    }
  }
}