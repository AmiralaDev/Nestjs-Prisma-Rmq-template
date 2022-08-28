import { DocumentBuilder } from '@nestjs/swagger';

export default function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('boilerplate')
    .setDescription('boilerplate')
    .setVersion('0.1.0')
    .build();
}
