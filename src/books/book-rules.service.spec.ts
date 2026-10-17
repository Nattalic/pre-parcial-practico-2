import { ConflictException } from '@nestjs/common';
import { BookRulesService } from './book-rules.service';
import { BookEntity } from './entities/book.entity';

describe('BookRulesService', () => {
  let service: BookRulesService;

  beforeEach(() => {
    service = new BookRulesService();
  });

  it('rejects a book without available copies', () => {
    const book = { id: 3, title: 'The Little Prince', availableCopies: 0 } as BookEntity;

    // TODO TEST 1: Call the real rule and check ConflictException.
    // Replace the error below with your test. Do not leave an empty test.
    throw new Error('TODO TEST 1: complete the rule test');
  });
});
