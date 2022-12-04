<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

### Servir achivos estáticos mediante NestJS

Es necesario instalar un paquete separado de Nest, e importar el módulo en el módulo principal, especificando el directorio dónde se localizan los archivos estáticos

```
npm i @nestjs/serve-static

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
```
- Para aplicaciones SPA que son servidas medainte NestJS, el directorio debería incluir dicha App.
- Para aplicaciónes multipágina, el directorio debería contener los assets del proyecto

### Levantar una imagen de Base de datos mediante Docker

- Generar un archivo de configuración de Docker en la raíz del proyecto **docker-compose.yaml**, especificando que imagenes de docker se quieren utilizar.

```
version: '3'              // La versión actual de Docker

services:
  db:
    image: mongo:5        // Nombre de la imagen y su respectiva version (la versión se corresponde con el tag)
    restart: always
    ports:                // Los contenedores de docker están aislados del computador, etonces genero un puente para comunicar el puerto de la computadora con el puerto del contenedor
      - 27017:27017
    environment:          // El nombre de la base de datos a generar en el conentedor
      MONGODB_DATABASE: nest-pokemon
    volumes:              // Al eliminar la imagen del contenedor se pierde la data, entonces genero un puente para que se grabe la información en algún espacio del sistema de archivos del computador (data/db es el espacio que usa mongo para guardar info)
      - ./mongo:/data/db
```

- Levantar la imagenes (servicios) especificados en el archivo de configuración
- Si la imagen no existe aun, Docker comenzará a descargarla
- Si todo es correcto, Docker genera un contenedor con todas las imagenes especificadas corriendo con la configuración establecida en el archivo de configuración

```
// Desde terminal...

docker-compose up -d
```

### Conectarse a la base de datos

- Buscar un programa que nos permita gestionar bases de datos (NoSQL, Relacional, etc) - **TablePus**
- Indicar la URL de conexión (para el caso de MongoDB)

```
mongodb://localhost:27017/base_de_datos

Testear y Listo
```

