import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import {
  IProductRepository,
  categoriesToCreate,
} from 'src/domain/checkin/products/repositories/product.repository';
import { Category } from 'src/domain/checkin/products/entities/category.entity';
import { Product } from 'src/domain/checkin/products/entities/product.entity';
import { NotFoundException } from 'src/application/errors';

export class ProductSequelizeRepository implements IProductRepository {
  async findOrCreateCategories(
    categoriesToCreate: categoriesToCreate,
  ): Promise<void> {
    Promise.all([
      categoriesToCreate.map(async (category) =>
        CategoryModel.findOrCreate({
          where: { name: category.name },
          defaults: category,
        }),
      ),
    ]);
  }

  async getCategories(): Promise<Category[]> {
    const categories = await CategoryModel.findAll();
    if (categories.length < 1)
      throw new NotFoundException('categories not exists.');
    return categories.map(
      (c) =>
        new Category({
          id: c.id,
          name: c.name,
          description: c.description,
        }),
    );
  }

  async updateQuantity(id: string, quantity: number): Promise<number> {
    await ProductModel.update({ quantity }, { where: { id } });
    return quantity;
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    const productModel = await ProductModel.findAll({
      where: { categoryId },
    });
    if (!productModel)
      throw new NotFoundException('product category not exists.');

    return productModel.map((pm) => {
      return new Product({
        id: pm.id,
        categoryId: pm.categoryId,
        description: pm.description,
        name: pm.name,
        price: Number(pm.price),
        quantity: pm.quantity,
      });
    });
  }

  async findOne(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } });
    if (!productModel) return null;

    return new Product({
      id: productModel.id,
      categoryId: productModel.categoryId,
      description: productModel.description,
      name: productModel.name,
      price: productModel.price,
      quantity: productModel.quantity,
    });
  }

  async findAll(): Promise<Product[]> {
    const productsModel = await ProductModel.findAll();

    return productsModel.map((p) => {
      return new Product({
        id: p.id,
        name: p.name,
        categoryId: p.categoryId,
        description: p.description,
        price: p.price,
        quantity: p.quantity,
      });
    });
  }

  async create(params: Partial<Product>): Promise<Product> {
    const productModel = await ProductModel.create(params);

    return new Product({
      id: productModel.id,
      categoryId: productModel.categoryId,
      description: productModel.description,
      name: productModel.name,
      price: productModel.price,
      quantity: productModel.quantity,
    });
  }

  async delete(id: string): Promise<void> {
    await ProductModel.destroy({ where: { id } });
  }

  async update(
    id: string,
    { name, price, description, categoryId }: Partial<Product>,
  ): Promise<void> {
    await ProductModel.update(
      { name, price, description, categoryId },
      { where: { id } },
    );
  }
}
