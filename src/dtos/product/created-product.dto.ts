import { ProductEntity } from "../../entities/product.entity";
import { CreateProductDto } from "./create-product.dto";

export class CreatedProductDto extends CreateProductDto {
  id!: string;


  constructor({
    name, description, value, disponibility, image, id, category,
  }: ProductEntity) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.value = value;
    
    this.disponibility = disponibility;
    this.image = image;
    this.categoryId = category.id;
  }
}