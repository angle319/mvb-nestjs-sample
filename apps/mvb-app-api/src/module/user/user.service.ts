import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { account, accountSetting } from 'models/public';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(account)
    @InjectModel(accountSetting)
    private readonly userModel: typeof account,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  findAll() {
    console.log(this.userModel.prototype);
    return this.userModel.findAll();
  }

  findOne(id: string) {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, { where: { id } });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
