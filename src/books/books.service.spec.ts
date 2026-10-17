import { ConflictException } from '@nestjs/common';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryEntity } from '../categories/entities/category.entity';
import { BookEntity } from './entities/book.entity';
import { BookRulesService } from './book-rules.service';
import { BooksService } from './books.service';
import { Repository } from 'typeorm';

describe('BooksService', () => {
  let service: BooksService;
  let booksRepositoryMock: {
    findOne: jest.Mock<() => Promise<BookEntity | null>>;
    find: jest.Mock;
    create: jest.Mock;
    save: jest.Mock<(book: BookEntity) => Promise<BookEntity>>;
    merge: jest.Mock;
    remove: jest.Mock;
  };
  let categoriesRepositoryMock: { findOneBy: jest.Mock };
  let bookRulesServiceMock: { ensureCanBorrow: jest.Mock };

  beforeEach(async () => {
    // Fresh mocks keep one test's behavior from affecting another test.
    booksRepositoryMock = {
      findOne: jest.fn<() => Promise<BookEntity | null>>(),
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn<() => Promise<BookEntity>>(),
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

    const savedBook = { ...book, 
      availableCopies: 2 
    } as BookEntity;

    // TODO TEST 2: Arrange findOne() and save() responses; call borrow(7).
    // Assert the rule call, the saved copy count and the returned result.
    booksRepositoryMock.findOne.mockResolvedValue(book);
    booksRepositoryMock.save.mockResolvedValue(savedBook);

    //Act
    const result = await service.borrow(7)

    //Assert
    expect(bookRulesServiceMock.ensureCanBorrow).toHaveBeenCalledWith(book)

    expect(booksRepositoryMock.save).toHaveBeenCalledWith(
      expect.objectContaining({
      id: 7,
      availableCopies: 2,
    }),
    )

    expect(result).toEqual(savedBook)
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
    booksRepositoryMock.findOne.mockResolvedValue(book);
    
    bookRulesServiceMock.ensureCanBorrow.mockImplementation(() => {
      throw new ConflictException('Book has not copies avaible');
    });

    //Act and Assert
    await expect(service.borrow(9)).rejects.toBeInstanceOf(
      ConflictException,
  );
    expect(book.availableCopies).toBe(0);
    expect(booksRepositoryMock.save).not.toHaveBeenCalled();
  });
});
