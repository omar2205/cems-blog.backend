import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from '../auth/auth.guard';
import { RequestGuardUser } from '../auth/types';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  async getAllPosts() {
    return this.blogService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return (await this.blogService.getPostById(id)).populate(
      'author',
      '-password',
    );
  }

  @UseGuards(AuthGuard)
  @Post()
  async createPost(
    @Body('title') title: string,
    @Body('content') content: string,
    @Request()
    req: RequestGuardUser,
  ) {
    const author = req.user.sub;
    return this.blogService.createPost(title, content, author);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('content') content: string,
    @Request()
    req: RequestGuardUser,
  ) {
    const post = await this.blogService.getPostById(id);
    if (post.author.toString() === req.user.sub)
      return this.blogService.updatePost(id, title, content);
    throw new UnauthorizedException();
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePost(
    @Param('id') id: string,
    @Request()
    req: RequestGuardUser,
  ) {
    const post = await this.blogService.getPostById(id);
    if (post.author.toString() === req.user.sub)
      return this.blogService.deletePost(id);
    throw new UnauthorizedException();
  }
}
