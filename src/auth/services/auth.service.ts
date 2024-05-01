import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities';
import { LoginResDto } from '../dto';
import { UserRepository } from '../repositories';
import { RequestInfo, TokenPayload } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BusinessException } from 'src/exception/BusinesException';
import { AccessTokenRepository, AccessLogRepository } from '../repositories';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly accessTokenRepository: AccessTokenRepository,
        private readonly accessLogRepository: AccessLogRepository,
    ) {}

    async login(email: string, plainPassword: string, req: RequestInfo): 
    Promise<LoginResDto> {
        const user = await this.validateUser(email, plainPassword);
        const payload: TokenPayload = this.createTokenPayload(user.id);

        const [accessToken, refreshToken] = await Promise.all([
            this.createAccessToken(user, payload),
            this.createRefreshToken(user, payload),
        ]);

        const { ip, endpoint, ua } = req;
        await this.accessLogRepository.createAccessLog(user, ua, endpoint, ip);

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
        };
    }

    private async validateUser(email: string, plainPassword: string): Promise<User> {

        const user = await this.userRepository.findOne({ where: { email }});
        if (user && (await argon2.verify(user.password, plainPassword))) {
            return user;
        }
        throw new BusinessException(
            'auth',
            'invalid-expiry',
            'Invalid expiry time',
            HttpStatus.BAD_REQUEST,
        );
    }

    createTokenPayload(userId: number): TokenPayload {
        return{
            sub: userId,
            iat: Math.floor(Date.now() / 1000),
            jti: uuidv4(),
        };
    }

    async createAccessToken(user: User, payload: TokenPayload): Promise<string> {
        const expiresIn = this.configService.get<string>('ACCESS_TOKEN_EXPIRY');
        const token = this.jwtService.sign(payload, { expiresIn });
        const expiresAt = this.calculateExpiry(expiresIn);

        await this.accessTokenRepository.saveAccessToken(
            payload.jti,
            user,
            token,
            expiresAt,
        );
        return token;
    }

    async createRefreshToken(user: User, payload: TokenPayload): Promise<string> {
        const expiresIn = this.configService.get<string>('REFRESH_TOKEN_EXPIRY');
        return;
    }

    private calculateExpiry(expiry: string): Date {
        let expiresInMilliseconds = 0;

        if (expiry.endsWith('d')){
            const days = parseInt(expiry.slice(0, -1), 10);
            expiresInMilliseconds = days * 24 * 60 * 60 * 1000;
        } else if (expiry.endsWith('h')){
            const hours = parseInt(expiry.slice(0, -1), 10);
            expiresInMilliseconds = hours * 60 * 60 * 1000;
        } else if (expiry.endsWith('m')){
            const minutes = parseInt(expiry.slice(0, -1), 10);
            expiresInMilliseconds = minutes * 60 * 1000;
        } else if (expiry.endsWith('s')){
            const seconds = parseInt(expiry.slice(0, -1), 10);
            expiresInMilliseconds = seconds * 1000;
        } else {
            throw new BusinessException(
                'auth',
                'invalid-expiry',
                'Invalid expiry time',
                HttpStatus.BAD_REQUEST,
            );
        }

        return new Date(Date.now() + expiresInMilliseconds);
    }
}


    
