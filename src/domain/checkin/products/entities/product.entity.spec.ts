import { AttributeException } from 'src/domain/@shared/errors';
import { IProduct, Product } from './product.entity';
import { Category } from './category.entity';

describe('Product Entity', () => {
  describe('validate', () => {
    const category = new Category({
      description: 'category description test',
      id: '1',
      name: 'Bebida',
    });
    it('should validate id', () => {
      // arrange
      let product: IProduct;
      try {
        // act
        product = new Product({
          id: null,
          categoryId: category.id,
          description: 'description-test',
          name: 'name-test',
          price: 3.5,
          quantity: 1,
        });
      } catch (error) {
        // assert
        expect(error).toBeTruthy();
        expect(error.message).toBe('id not found.');
        expect(error).toBeInstanceOf(AttributeException);
      }
      expect(product).toBeFalsy();
    });
    it('should validate name', () => {
      let product: IProduct;
      try {
        product = new Product({
          id: 'id-test',
          categoryId: category.id,
          description: 'description-test',
          name: null,
          price: 3.5,
          quantity: 1,
        });
      } catch (error) {
        expect(error).toBeTruthy();
        expect(error.message).toBe('name not found.');
        expect(error).toBeInstanceOf(AttributeException);
      }
      expect(product).toBeFalsy();
    });
  });
});
