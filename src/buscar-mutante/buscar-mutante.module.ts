import { Module } from '@nestjs/common';
import { BuscarMutanteService } from './buscar-mutante.service';
import * as ChallengeSchema from '../models/challenge.schema'
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChallengeSchema.Challenge.name, schema: ChallengeSchema.ChallengeSchema}
    ])],
  providers: [BuscarMutanteService],
  exports: [BuscarMutanteService]
})
export class BuscarMutanteModule {}
