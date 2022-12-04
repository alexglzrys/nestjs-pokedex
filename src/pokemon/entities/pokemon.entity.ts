import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Crear Esquema de Documento: Pokemon

// Las entidades representan la estructura de un registro en base de datos
// En este caso la entidad Pokemon representa un Documento de MongoDB (por tanto tiene que extender de Document, para que tienga automáticamente su _id, y campos de auditoría, métodos utilitarios)
// El decorador @Schema le dice a Mongoose que así lucirá la estructra del documento para un registro de Pokemon (esquemna de documento)
@Schema()
export class Pokemon extends Document {
  // id: string; // El ID lo genera Mongo de forma automática

  // El decorador Prop de Mongoose, le indica a la propiedad del documento sus respectivas caracteristicas
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

// Exportar el esquema de documento Pokemon, a partir de la clase Pokemon
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
