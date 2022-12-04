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
