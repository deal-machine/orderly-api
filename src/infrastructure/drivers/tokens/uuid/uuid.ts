import { IIdentifierGenerator } from 'src/application/ports/tokens/id-generator';
import { v4 } from 'uuid';

export class Uuid implements IIdentifierGenerator {
  generate(): string {
    return v4();
  }
}
