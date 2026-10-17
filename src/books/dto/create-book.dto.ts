import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateBookDto {
  // TODO 1: Add the validators required by the exercise. Do not convert body numbers.
  @IsNotEmpty()
  
  title!: string;
  availableCopies!: number;
  categoryId!: number;
}
