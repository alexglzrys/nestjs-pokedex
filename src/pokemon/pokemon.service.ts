import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    // Inyectar el modelo de Mongoose que se usará en este servicio
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    // De forma predeterminada NestJS atrapa los errores (Exception Zone), pero si deseamos ser nosotros quienes los controlemos, lo podemos hacer mediante el clásico try/catch
    try {
      // Cambiar todos los nombres a minusculas
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
      // Grabar en base de datos con la ayuda del modelo (todas las operaciones a BD son asíncronas)
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (err) {
      console.log(err);
      // Un error 11000 en MongoDB significa que el registro se encuentra duplicado
      if (err.code === 11000) {
        throw new BadRequestException(
          `Pokemon exist in DB ${JSON.stringify(err.keyValue)}`,
        );
      }
      throw new InternalServerErrorException(
        `Can't create Pokemon - Check server log`,
      );
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
