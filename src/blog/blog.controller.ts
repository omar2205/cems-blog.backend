import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) { }

  @Get()
  async getAllPosts() {
    return this.blogService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.blogService.getPostById(id);
  }

  @Post()
  async createPost(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('author') author: string,
  ) {
    return this.blogService.createPost(title, content, author);
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.blogService.updatePost(id, title, content);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.blogService.deletePost(id);
  }
}
