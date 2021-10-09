import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuscarMutanteModule } from './buscar-mutante/buscar-mutante.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:
    [MongooseModule.forRoot(process.env.MONGO_URI),
      BuscarMutanteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
