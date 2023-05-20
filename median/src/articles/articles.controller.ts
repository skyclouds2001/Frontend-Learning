import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return new ArticleEntity(
      await this.articlesService.create(createArticleDto),
    );
  }

  @Get()
  @ApiCreatedResponse({ type: ArticleEntity, isArray: true })
  async findAll() {
    return (await this.articlesService.findAll()).map(
      (article) => new ArticleEntity(article),
    );
  }

  @Get('drafts')
  @ApiCreatedResponse({ type: ArticleEntity, isArray: true })
  async findDrafts() {
    return (await this.articlesService.findDrafts()).map(
      (article) => new ArticleEntity(article),
    );
  }

  @Get(':id')
  @ApiCreatedResponse({ type: ArticleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const article = await this.articlesService.findOne(id);
    if (!article)
      throw new NotFoundException(`Article with ${id} does not exist.`);
    return new ArticleEntity(article);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ArticleEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const article = await this.articlesService.update(id, updateArticleDto);
    if (!article)
      throw new NotFoundException(`Article with ${id} does not exist.`);
    return new ArticleEntity(article);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ArticleEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const article = await this.articlesService.remove(id);
    if (!article)
      throw new NotFoundException(`Article with ${id} does not exist.`);
    return new ArticleEntity(article);
  }
}
