import { ConflictException, Injectable, NotImplementedException } from '@nestjs/common';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookRulesService {
  ensureCanBorrow(book: BookEntity): void {
    // TODO 2: Allow borrowing when copies are available.
    // Otherwise throw ConflictException. Do not access a repository here.
    throw new NotImplementedException('TODO 2: implement the borrowing rule');
  }
}
