import { Test, TestingModule } from '@nestjs/testing';
import { AuthConfigService } from './auth.config';

describe('AuthConfigService', () => {
  let service: AuthConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthConfigService],
    }).compile();

    service = module.get<AuthConfigService>(AuthConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
