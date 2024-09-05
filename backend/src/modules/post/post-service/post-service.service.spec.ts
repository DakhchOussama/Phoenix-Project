import { Test, TestingModule } from '@nestjs/testing';
import { PostServiceService } from './post-service.service';

describe('PostServiceService', () => {
  let service: PostServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostServiceService],
    }).compile();

    service = module.get<PostServiceService>(PostServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
