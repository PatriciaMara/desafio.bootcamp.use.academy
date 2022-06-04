import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity({ name: "products" })
  export class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ type: "varchar", nullable: false })
    name!: string;
  
    @Column({ type: "varchar", nullable: false })
    description!: string;
  
    @Column({ type: "float", nullable: false })
    value!: number;

    @Column({ type: "boolean", nullable: false })
    disponibility!: boolean;
  
    @Column({ type: "varchar", nullable: false })
    image!: string;
  
    @ManyToOne(() => CategoryEntity, (category) => category.products, {
      onDelete: "CASCADE",
      nullable: false,
    })
    @JoinColumn({ name: "category_id", referencedColumnName: "id" })
    category!: CategoryEntity;
  }