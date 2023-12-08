export class PaginatedDto<T> {
  private data: T[];
  private page: number;
  private totalPage: number;
  private limit: number;

  static of<T>(
    data: T[],
    page: number,
    totaItemCount: number,
    limit: number,
  ): PaginatedDto<T> {
    const dto = new PaginatedDto<T>();
    dto.data = data;
    dto.page = page;
    dto.totalPage = Math.ceil(totaItemCount / limit);
    dto.limit = limit;
    return dto;
  }
}
