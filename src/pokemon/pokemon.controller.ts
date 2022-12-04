import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

// La formá más sencilla de anteponer un prefijo para todo este grupo de endpoints, sería colocarlo en el decorador @Controller('perfix/group')
// Sin embargo, cuando son muchos controladores, lo mejor es colocar ese prefijo de forma global a nivel de aplicación
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // NestJS ya viene configurado con los códigos de respuesta HTTP para cada verbo HTTP, si embargo, podemos forzar a lanzar otro código de estado mediante el decorador @HttpCode()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  // Nuestra API busca un pokemon por su _id, name o número
  @Get(':id')
  findOne(@Param('id') term: string) {
    return this.pokemonService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }
}
