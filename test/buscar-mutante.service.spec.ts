import { Test, TestingModule } from '@nestjs/testing';
import { BuscarMutanteService } from '../src/buscar-mutante/buscar-mutante.service';
import { BuscarMutanteModule } from '../src/buscar-mutante/buscar-mutante.module';
import { getModelToken } from '@nestjs/mongoose';
import * as ChallengeSchema from '../src/models/challenge.schema'

describe('BuscarMutanteService', () => {
  let service: BuscarMutanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BuscarMutanteService, {
          provide: getModelToken(ChallengeSchema.Challenge.name),
          useValue: ChallengeSchema.Challenge
        }
      ]
    }).compile();

    service = module.get<BuscarMutanteService>(BuscarMutanteService);
  });

  describe('buscarFila', () => {

    it('debe retornar que es mutante dada la secuencia CCCC', async () => {
      const dna = ["ATCCTA", "CAGTGC", "TTATGT", "AGATGG", "CCCCTA", "TCGCTG"];
      expect(service.buscarFila(dna)).toBe(true);
    });
  });

  describe('buscarColumna', () => {

    it('debe retornar que es mutante dada la secuencia AAAA', async () => {
      const dna = ["AACCTA", "CAGTGC", "TAATGT", "AAGTGG", "CCGCTA", "TCGCTG"];
      expect(service.buscarColumna(dna)).toBe(true);
    });
  });

  describe('buscarDiagonal', () => {

    it('debe retornar que es mutante dada la secuencia TTTT', async () => {
      const dna = ["ACGATC", "TCATGT", "AGTCAG", "TTACCG", "GTCAGT", "AGTCCA"];
      expect(service.buscarDiagonal(dna)).toBe(true);
    });
  });

  describe('buscarDiagonal', () => {

    it('debe retornar que es mutante dada la secuencia CCCC', async () => {
      const dna = ["ACGATC", "TCATGT", "CGTCAG", "TCACCG", "GTCAGT", "AGTCCA"];
      expect(service.buscarDiagonal(dna)).toBe(true);
    });
  });

  describe('buscarFila', () => {

    it('debe retornar que es Humano', async () => {
      const dna = ["ACGATC", "TCATGT", "AGTCAG", "TCACCA", "GTAAGT", "AGTGCA"];
      expect(service.buscarFila(dna)).toBe(false);
    });
  });

  describe('buscarColumna', () => {

    it('debe retornar que es Humano', async () => {
      const dna = ["ACGATC", "TCATGT", "AGTCAG", "TCACCA", "GTAAGT", "AGTGCA"];
      expect(service.buscarColumna(dna)).toBe(false);
    });
  });

  describe('buscarDiagonalI', () => {

    it('debe retornar que es Humano', async () => {
      const dna = ["ACGATC", "TCATGT", "AGTCAG", "TCACCA", "GTAAGT", "AGTGCA"];
      expect(service.buscarDiagonal(dna)).toBe(false);
    });
  });

});
