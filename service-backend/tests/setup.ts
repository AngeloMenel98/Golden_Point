import 'reflect-metadata';

// Mock AppDataSource before any imports
const mockQueryBuilder = {
  innerJoin: jest.fn().mockReturnThis(),
  leftJoinAndSelect: jest.fn().mockReturnThis(),
  leftJoin: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  addSelect: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  setParameters: jest.fn().mockReturnThis(),
  groupBy: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  getMany: jest.fn().mockResolvedValue([]),
  getRawMany: jest.fn().mockResolvedValue([]),
  getRawOne: jest.fn().mockResolvedValue({}),
  getCount: jest.fn().mockResolvedValue(0),
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  execute: jest.fn().mockResolvedValue({}),
};

const mockManager = {
  transaction: jest.fn((cb: Function) =>
    cb({
      getRepository: jest.fn().mockReturnValue({
        findOne: jest.fn(),
        find: jest.fn(),
        save: jest.fn(),
        create: jest.fn(),
      }),
    })
  ),
};

// Create a mock repository that supports extend
const createMockRepository = () => {
  const repo: any = {
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
    manager: mockManager,
  };
  
  // Add extend method that TypeORM uses
  repo.extend = jest.fn().mockImplementation((extension: object) => {
    return { ...repo, ...extension };
  });
  
  return repo;
};

const mockGetRepository = jest.fn().mockImplementation(() => createMockRepository());

jest.mock('../src/data-source', () => ({
  AppDataSource: {
    getRepository: mockGetRepository,
    initialize: jest.fn().mockResolvedValue({}),
    destroy: jest.fn().mockResolvedValue(undefined),
  },
}));

// Global test timeout
jest.setTimeout(10000);
