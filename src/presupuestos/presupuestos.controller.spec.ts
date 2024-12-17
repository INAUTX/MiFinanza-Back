import { Test, TestingModule } from '@nestjs/testing';
import { PresupuestosController } from './presupuestos.controller';

describe('PresupuestosController', () => {
  let controller: PresupuestosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresupuestosController],
    }).compile();

    controller = module.get<PresupuestosController>(PresupuestosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
