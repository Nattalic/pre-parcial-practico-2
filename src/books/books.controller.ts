import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { requestValidationPipe } from '../common/request-validation.pipe';
import { CreateBookDto } from './dto/create-book.dto';
import { FilterBooksQueryDto } from './dto/filter-books-query.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  // TODO 1: Implement POST /api/books with a validated CreateBookDto.

  // Completed reference endpoint. Keep it BEFORE the dynamic GET ':id' route.
  @Get('search')
  findFiltered(@Query(requestValidationPipe) query: FilterBooksQueryDto) {
    return this.booksService.findFiltered(query);
  }

  // TODO 2: Implement PATCH /api/books/:id/borrow with ParseIntPipe and no body.

  // The existing endpoints below are completed. Do not change them.
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(requestValidationPipe) dto: UpdateBookDto,
  ) {
    return this.booksService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
}
