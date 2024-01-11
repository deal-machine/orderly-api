import { JwtService } from '@nestjs/jwt';
import { ITokenGenerator } from 'src/application/ports/tokens/token-generator';

export class Jwt implements ITokenGenerator {
  constructor(private jwtService: JwtService) {}

  generate(payload: any): string {
    return this.jwtService.sign(
      { sub: payload },
      { secret: 'jwtConstants.secret' },
    );
  }
}
