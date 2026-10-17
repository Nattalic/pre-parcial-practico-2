import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../categories/entities/category.entity';
import { BookEntity } from './entities/book.entity';
import { BookRulesService } from './book-rules.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { LibrarySeedService } from './library-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, CategoryEntity])],
  controllers: [BooksController],
  // TODO 2: Register BookRulesService as a provider.
  providers: [BooksService, LibrarySeedService],
})
export class BooksModule {}
