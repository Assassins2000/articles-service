import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class PatchArticlesDto {
  @IsOptional()
  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public content: string;

  @IsOptional()
  @IsBoolean()
  public is_private: boolean;

  constructor(title: string, content: string, is_private: boolean) {
    this.title = title;
    this.content = content;
    this.is_private = is_private;
  }
}
