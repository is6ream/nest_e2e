import { Test, TestingModule } from '@nestjs/testing';
import { OrdersnpxService } from './ordersnpx.service';

describe('OrdersnpxService', () => {
  let service: OrdersnpxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersnpxService],
    }).compile();

    service = module.get<OrdersnpxService>(OrdersnpxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
