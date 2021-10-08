import { Test, TestingModule } from '@nestjs/testing';
import { BuscarMutanteService } from '../../src/buscar-mutante/buscar-mutante.service';
import { BuscarMutanteModule } from '../../src/buscar-mutante/buscar-mutante.module';

describe('BuscarMutanteService', () => {
  let service: BuscarMutanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuscarMutanteService]
    }).compile();

    service = module.get<BuscarMutanteService>(BuscarMutanteService);
  });
 
  describe('buscarFila', () => {
    it('debe retornar que es mutante dada la secuencia CCCC', async () => {
      const dna = ["ATCCTA","CAGTGC","TTATGT","AGATGG","CCCCTA","TCGCTG"];
      expect(service.buscarFila(dna)).toBe(true);
    });
  });
});
