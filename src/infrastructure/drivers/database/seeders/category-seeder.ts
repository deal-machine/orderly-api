import { IIdentifierGenerator } from 'src/application/ports/tokens/id-generator';
import { IProductRepository } from 'src/domain/checkin/products/repositories/product.repository';

export class CategorySeeder {
  private productRepository: IProductRepository;
  private idGenerator: IIdentifierGenerator;

  constructor(
    productRepository: IProductRepository,
    idGenerator: IIdentifierGenerator,
  ) {
    this.idGenerator = idGenerator;
    this.productRepository = productRepository;
  }

  async seed() {
    console.time('Seed categories');

    try {
      const categoriesToCreate = [
        {
          id: this.idGenerator.generate(),
          name: 'Lanche',
          description: 'Lanches deliciosos',
        },
        {
          id: this.idGenerator.generate(),
          name: 'Acompanhamento',
          description: 'Diversos acompanhamentos',
        },
        {
          id: this.idGenerator.generate(),
          name: 'Bebida',
          description: 'Sucos refrescantes',
        },
        {
          id: this.idGenerator.generate(),
          name: 'Sobremesa',
          description: 'Delicias saudáveis',
        },
      ];
      await this.productRepository.findOrCreateCategories(categoriesToCreate);
    } catch (error) {
      console.error(error.message);
    }

    console.timeEnd('Seed categories');
  }
}
