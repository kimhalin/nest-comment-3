import { IsNumber, IsOptional, Max } from 'class-validator';
import { Type } from 'class-transformer';

const MAX_ITEMS_PER_PAGE = 1000;
const DEFAULT_ITEMS_PER_PAGE = 30;
export class PaginatedRequestDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Max(MAX_ITEMS_PER_PAGE)
  limit?: number = DEFAULT_ITEMS_PER_PAGE;

  get _limit(): number {
    return this.limit;
  }

  get _offset(): number {
    const page = this.page ?? 1;
    const perPage = this.limit;

    return (page - 1) * perPage;
  }
}
