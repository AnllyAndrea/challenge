import { Test, TestingModule } from '@nestjs/testing';
import { BuscarMutanteService } from './buscar-mutante.service';

describe('BuscarMutanteService', () => {
  let service: BuscarMutanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuscarMutanteService],
    }).compile();

    service = module.get<BuscarMutanteService>(BuscarMutanteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
