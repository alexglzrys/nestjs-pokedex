import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    // Registrar los esquemas de documento usados en este módulo y crear sus respectivos modelos para trabajar con la BD
    MongooseModule.forFeature([
      {
        name: Pokemon.name, // El nombre que le ha asignado MongoDB al documento
        schema: PokemonSchema, // El Schema de Documento para crear el respectivo modelo
      },
    ]),
  ],
})
export class PokemonModule {}
