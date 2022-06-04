import { body, ValidationChain } from 'express-validator';
import { RequestDto } from '../request-dto/request.dto';

export class UpdateCategoryDto extends RequestDto {
  name!: string;

  static validators(): ValidationChain[] {
    return [
      body('name', 'Valor name não é uma string!').isString(),
    ];
  }
}