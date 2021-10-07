import { Injectable } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as ChallengeSchema from '../models/challenge.schema'
import * as mongoose from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectUnsubscribedError } from 'rxjs';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';


@Injectable()
export class BuscarMutanteService {

    constructor(@mongoose.InjectModel(ChallengeSchema.Challenge.name)
    private readonly challengeModelSchema: Model<ChallengeSchema.Challenge>,
    @InjectConnection() private connection: Connection) {  
    }

    // Buscar la cadena en el array que entra a nivel de filas
    buscarFila(adn: string[]): boolean {

        let respuesta: boolean = false;

        var expresion = /(AAAA|CCCC|TTTT|GGGG)/gi;

        for (let index = 0; index < adn.length; index++) {
            const element = adn[index];

            var buscarFila = element.match(expresion);

            if (buscarFila) {
                respuesta = true;
            }
        }
        return respuesta;
    }

    formarColumna(adn: string[]): string[] {

        let concatLetras: string[] = [];

        for (let indexF = 0; indexF < adn.length; indexF++) {
            const elementoFila = adn[indexF];

            let letras = elementoFila.split('');

            for (let indexC = 0; indexC < letras.length; indexC++) {
                const elementoColumna = letras[indexC];

                if (concatLetras[indexC]) {
                    concatLetras[indexC] = concatLetras[indexC] + elementoColumna
                }
                else {
                    concatLetras[indexC] = elementoColumna
                }
            }
        }
        return concatLetras;
    }

    buscarColumna(adn: string[]): boolean {

        let guardarColumna = this.formarColumna(adn)
        let buscar = this.buscarFila(guardarColumna)

        return buscar;

    }

    crearMatriz(adn: string[]): Array<Array<string>> {

        let matriz: Array<Array<string>> = [];

        for (let indexM = 0; indexM < adn.length; indexM++) {
            const elementoM = adn[indexM];

            let elementoMatriz = elementoM.split('');

            matriz.push(elementoMatriz);

        }
        return matriz;
    }

    formarDiagonal(matriz: Array<Array<string>>): string[] {

        var lado = matriz[0].length + matriz.length - 2;
        var fila = 0;
        let columnaB = 1;
        let matrizD = [];

        for (let columna = 1; columna < lado; columna++) {

            if (columna >= matriz[0].length) {

                columnaB = matriz[0].length - 1

                fila = fila + 1;
            }
            else {

                columnaB = columna;
            }

            const element = matriz[fila][columnaB];

            let recorrerFila = fila + 1;

            let diagonal = element;

            for (let indexA = columnaB - 1; indexA >= 0 && matriz[recorrerFila]; indexA--) {
                const elemento = matriz[recorrerFila][indexA];

                diagonal = diagonal + elemento

                recorrerFila = recorrerFila + 1

            }
            matrizD.push(diagonal)
        }
        return matrizD;
    }

    formarDiagonalD(matriz: Array<Array<string>>): string[] {

        var lado = matriz[0].length + matriz.length - 2;
        var fila = 0;
        let columnaB = matriz[0].length;
        let matrizD = [];


        for (let columna = lado; columna >= 0; columna--) {

            if (lado - columna >= matriz[0].length) {

                columnaB = 0

                fila = fila + 1;
            }
            else {

                columnaB--;
            }

            const element = matriz[fila][columnaB];

            let recorrerFila = fila + 1;

            let diagonal = element;

            for (let indexA = columnaB + 1; indexA < matriz[0].length && matriz[recorrerFila]; indexA++) {
                const elemento = matriz[recorrerFila][indexA];

                diagonal = diagonal + elemento

                recorrerFila = recorrerFila + 1

            }
            matrizD.push(diagonal)
        }
        return matrizD;
    }

    buscarDiagonal(adn: string[]): boolean {

        let guardarMatriz = this.crearMatriz(adn);
        let buscarDiagonalI = this.formarDiagonal(guardarMatriz);
        let buscarDiagonalD = this.formarDiagonalD(guardarMatriz);
        let concatDiagonal = buscarDiagonalI.concat(buscarDiagonalD)
        let buscarCadena = this.buscarFila(concatDiagonal)


        return buscarCadena;
    }

    buscarMutante(adn: string[]): boolean {

        let buscar1 = this.buscarFila(adn);
        let buscar2 = this.buscarColumna(adn);
        let buscar3 = this.buscarDiagonal(adn);

        let validar = buscar1 || buscar2 || buscar3;

        this.challengeModelSchema.create({ adn: JSON.stringify(adn), resultado: validar })

        return validar;
    }

    //buscar en los archivos de mongo
    buscarEstadistica() {

        let estadistica = this.challengeModelSchema.find({resultado:true});

        console.log(estadistica)

        return estadistica;

    }

}
