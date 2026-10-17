import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateBookDto {
  // TODO 1: Add the validators required by the exercise. Do not convert body numbers.
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  title!: string;

  @IsInt()
  @Min(0)
  @Max(20)
  availableCopies!: number;

  @IsInt()
  @Min(1)
  categoryId!: number;
}
