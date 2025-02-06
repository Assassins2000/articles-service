import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsOptional } from 'class-validator';

export class QueryParamsDto {
  @IsOptional()
  @Transform(({ value }: { value: string }) => value.split(',').map(Number))
  @IsArray()
  @IsInt({ each: true })
  public tagIds: number[];
}
