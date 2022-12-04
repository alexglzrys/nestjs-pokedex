import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
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

  async findOne(term: string) {
    let pokemon: Pokemon;
    // Verificar si el término de búsqueda es un número
    if (!isNaN(Number(term))) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    // verificar si el término de búsqueda es un id de mongo
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    // En este punto damos por hecho que el término de búsqueda es por nombre
    // parseamos el término de busqueda a minusculas
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.trim().toLocaleLowerCase(),
      });
    }

    // Si no hay pokemon, entonces controlamos el error
    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no. "${term}" not found`,
      );

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
