import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryEntity } from '../categories/entities/category.entity';
import { BookEntity } from './entities/book.entity';
import { BookRulesService } from './book-rules.service';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;
  let booksRepositoryMock: {
    findOne: jest.Mock;
    find: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    merge: jest.Mock;
    remove: jest.Mock;
  };
  let categoriesRepositoryMock: { findOneBy: jest.Mock };
  let bookRulesServiceMock: { ensureCanBorrow: jest.Mock };

  beforeEach(async () => {
    // Fresh mocks keep one test's behavior from affecting another test.
    booksRepositoryMock = {
      findOne: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      merge: jest.fn(),
      remove: jest.fn(),
    };
    categoriesRepositoryMock = { findOneBy: jest.fn() };
    bookRulesServiceMock = { ensureCanBorrow: jest.fn() };

    const moduleRef = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: getRepositoryToken(BookEntity), useValue: booksRepositoryMock },
        { provide: getRepositoryToken(CategoryEntity), useValue: categoriesRepositoryMock },
        { provide: BookRulesService, useValue: bookRulesServiceMock },
      ],
    }).compile();
    service = moduleRef.get(BooksService);
  });

  it('borrows one copy and returns the saved book', async () => {
    const book = {
      id: 7,
      title: 'Clean Code',
      availableCopies: 3,
      category: { id: 1, name: 'Technology' },
    } as BookEntity;
    const savedBook = { ...book, availableCopies: 2 } as BookEntity;

    // TODO TEST 2: Arrange findOne() and save() responses; call borrow(7).
    // Assert the rule call, the saved copy count and the returned result.
    throw new Error('TODO TEST 2: complete the successful borrowing test');
  });

  it('does not change or save a book when the rule rejects borrowing', async () => {
    const book = {
      id: 9,
      title: 'The Little Prince',
      availableCopies: 0,
      category: { id: 2, name: 'Literature' },
    } as BookEntity;

    // TODO TEST 3: Arrange findOne(); make the rule throw ConflictException.
    // Assert the rejected operation, unchanged copies and no save() call.
    throw new Error('TODO TEST 3: complete the rejected borrowing test');
  });
});
