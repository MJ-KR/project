import { MemoryTransactionRepository } from './memory-transaction-repository';

describe('MemoryTransactionRepository', () => {
  it('should be defined', () => {
    expect(new MemoryTransactionRepository()).toBeDefined();
  });
});
