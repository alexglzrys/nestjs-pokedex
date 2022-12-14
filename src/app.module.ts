import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // Importar módulo para servir archivos estáticos.
    // Es similar a cuando se trabaja con ExpressJS, se tiene que especificar dónde están alojados los assets del proyecto.
    // Para este caso solo nos interesa especificar dónde se encuentra la carpeta con la aplicación SPA del proyecto
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // Establecer conexión con la base de datos
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokemonModule,
    CommonModule,
  ],
})
export class AppModule {}
