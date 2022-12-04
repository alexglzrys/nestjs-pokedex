import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

// Los Pipes transforman la data
// nest g pi common/pipes/ParseMongoId --no-spec
@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    // Verificar que la data entrante sea un id de mongo válido
    if (!isValidObjectId(value))
      throw new BadRequestException(`${value} is not a valid MongoID`);

    return value;
  }
}
