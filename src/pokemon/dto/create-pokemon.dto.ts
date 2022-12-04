import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';
// npm i class-validator class-transformer

// DTO para validar la data (body request) al momento de registrar un Pokemon
export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  no: number;

  @IsString()
  @MinLength(1)
  name: string;
}
