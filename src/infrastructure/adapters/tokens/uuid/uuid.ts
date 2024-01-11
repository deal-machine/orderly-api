import { Injectable } from '@nestjs/common';
import { IIdentifierGenerator } from 'src/data/ports/tokens/id-generator';
import { v4 } from 'uuid';

@Injectable()
export class Uuid implements IIdentifierGenerator {
  generate(): string {
    return v4();
  }
}
