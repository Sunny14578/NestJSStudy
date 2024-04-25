import { Injectable, ConflictException } from '@nestjs/common';
import { User } from '../entities';
import { CreateUserDto } from '../dto';
import { UserRepository } from '../repositories/user.repository';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepo: UserRepository,
    ){}

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.userRepo.findOneByEmail(dto.email);
        if (user) {
            throw new ConflictException('A user with this email already exists.');
        }

        const hashedPassword = await argon2.hash(dto.password);

        console.log("해쉬");
        return this.userRepo.createUser(dto, hashedPassword);
    }
}
