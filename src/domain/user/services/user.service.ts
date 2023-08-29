import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { EmailException } from '../utils/error/email-exists';
import * as bcrypt from 'bcrypt';
import { IdNotFoundException } from '../utils/error/idnotfound';
import UserRepository from 'src/infra/user/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const isEmailAlreadyExists = await this.userRepository.findByEmail(email);

    if (isEmailAlreadyExists) {
      throw new EmailException();
    }

    const createUser = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 10),
      telephone: createUserDto.telephone,
    };

    const newUser = await this.userRepository.create(createUser);

    const createdUser = await this.userRepository.save(newUser);

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);
    if (user) {
      user.password = undefined;
      return user;
    }
    return null;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const findUser = await this.userRepository.findById(id);

    if (!findUser) {
      throw new IdNotFoundException(id);
    }

    const updateUser = {
      ...findUser,
      name: updateUserDto.name,
      email: updateUserDto.email,
      password: updateUserDto.password,
      telephone: updateUserDto.password,
    };

    const updatedUser = await this.userRepository.create(updateUser);

    return {
      ...updateUser,
      password: undefined,
    };
  }

  remove(id: number) {
    return this.userRepository.remove(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
