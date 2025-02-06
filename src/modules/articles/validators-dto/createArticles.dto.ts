import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateArticlesDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public content: string;

  @IsNotEmpty()
  @IsBoolean()
  public is_private: boolean;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  public tagsIds: number[];

  constructor(
    title: string,
    content: string,
    is_private: boolean,
    tagsIds: number[],
  ) {
    this.title = title;
    this.content = content;
    this.is_private = is_private;
    this.tagsIds = tagsIds;
  }
}
