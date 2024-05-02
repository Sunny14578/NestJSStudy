import { AuthController } from './controllers/auth.controller';
import { Module } from '@nestjs/common';
import { AuthService, UserService } from './services';
import { UserRepository, RefreshTokenRepository, 
  AccessLogRepository, AccessTokenRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, RefreshToken, AccessToken, AccessLog } from './entities';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
      HttpModule,
      ConfigModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRY'),
            
          },
        }),
      }),
      TypeOrmModule.forFeature([User, AccessToken, RefreshToken, AccessLog])
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, 
      UserRepository, AccessTokenRepository,
      RefreshTokenRepository, AccessLogRepository,
    ],
    exports: [AuthService, UserService, 
      UserRepository, AccessTokenRepository,
      RefreshTokenRepository, AccessLogRepository,
    ]
  })

export class AuthModule {}