import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../categories/entities/category.entity';
import { BookRulesService } from './book-rules.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBooksQueryDto } from './dto/filter-books-query.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly booksRepository: Repository<BookEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>,
    // TODO 2: Inject BookRulesService through this constructor.
  ) {}

  async create(dto: CreateBookDto): Promise<BookEntity> {
    // Completed. The exercise only requires its DTO and controller endpoint.
    const category = await this.categoriesRepository.findOneBy({ id: dto.categoryId });
    if (!category) throw new NotFoundException('Category was not found');
    const book = this.booksRepository.create({
      title: dto.title,
      availableCopies: dto.availableCopies,
      category,
    });
    return this.booksRepository.save(book);
  }

  async findFiltered(query: FilterBooksQueryDto): Promise<BookEntity[]> {
    // Completed reference. No changes are required for this search.
    return this.booksRepository.find({
      where: query.categoryId ? { category: { id: query.categoryId } } : {},
      relations: { category: true },
      order: { id: 'ASC' },
      take: query.limit,
    });
  }

  async borrow(id: number): Promise<BookEntity> {
    // TODO 2: Find the book, call the rule, subtract one copy, save and return.
    throw new NotImplementedException('TODO 2: implement borrowing');
  }

  // The methods below are already completed. Do not change them.
  findAll(): Promise<BookEntity[]> {
    return this.booksRepository.find({
      relations: { category: true },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<BookEntity> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!book) throw new NotFoundException(`Book with id ${id} was not found`);
    return book;
  }

  async update(id: number, dto: UpdateBookDto): Promise<BookEntity> {
    const book = await this.findOne(id);
    this.booksRepository.merge(book, dto);
    return this.booksRepository.save(book);
  }

  async remove(id: number): Promise<{ id: number; message: string }> {
    const book = await this.findOne(id);
    await this.booksRepository.remove(book);
    return { id, message: 'Book deleted' };
  }
}
