import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async findUserByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async createUser(username: string, password: string) {
    const newUser = new this.userModel({ username, password });
    return newUser.save();
  }

  async updateUser(id: string, username: string, password: string) {
    return this.userModel
      .findByIdAndUpdate(id, { username, password }, { new: true })
      .exec();
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
