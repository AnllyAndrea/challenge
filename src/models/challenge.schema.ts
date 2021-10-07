import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    collection: "challenge"
})

//Definición de los campos que se guardara en la base de datos
export class Challenge extends Document {

    @Prop()
    adn: string;
     
    @Prop()
    resultado: boolean;

}
//Exportar documento para que mongo lo pueda utilizar
export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
