import { ConflictException, Injectable } from '@nestjs/common';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookRulesService {
  ensureCanBorrow(book: BookEntity): void {
    // TODO 2: Allow borrowing when copies are available. 
    // Otherwise throw ConflictException. Do not access a repository here.
    if(book.availableCopies === 0){
      throw new ConflictException('No copies avaible')
    }
  }
}
