import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

/**
 * concluir rotas + testar
 * postman
 * swagger
 * validação de produtos - opção = criar status em orderItem como 'cancelado', 'incluido'
 *
 */
