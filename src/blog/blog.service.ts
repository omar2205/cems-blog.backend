import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async getAllPosts(): Promise<Post[]> {
    return this.postModel.find().sort({ createdAt: -1 }).exec();
  }

  async getPostById(id: string): Promise<Post> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Invalid id');
    }
    return this.postModel.findById(id).exec();
  }

  async createPost(
    title: string,
    content: string,
    author: string,
  ): Promise<Post> {
    if (!title || !content || !author)
      throw new BadRequestException('Missing items');
    const newPost = new this.postModel({ title, content, author });
    return newPost.save();
  }

  async updatePost(id: string, title: string, content: string): Promise<Post> {
    return this.postModel
      .findByIdAndUpdate(id, { title, content }, { new: true })
      .exec();
  }

  async deletePost(id: string): Promise<Post> {
    return this.postModel.findByIdAndDelete(id).exec();
  }
}
