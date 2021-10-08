import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuscarMutanteModule } from './buscar-mutante/buscar-mutante.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:
    [MongooseModule.forRoot('mongodb+srv://magneto:1234@cluster0.5coc1.mongodb.net/mutants?retryWrites=true&w=majority'),
      BuscarMutanteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
