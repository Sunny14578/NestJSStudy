import { AuthController } from './controllers/auth.controller';
import { Module } from '@nestjs/common';
import { AuthService, UserService } from './services';
import { UserRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';

@Module({
    imports: [
      TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, 
      UserRepository,
    ],
    exports: [AuthService, UserService,
    UserRepository,]
  })

export class AuthModule {}