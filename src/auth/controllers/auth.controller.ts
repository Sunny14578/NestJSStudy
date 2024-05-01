import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserDto, SignupResDto, LoginReqDto, LoginResDto } from '../dto';
import { UserService, AuthService } from '../services';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ){}

    @Post('login')
    async login(@Req() req, @Body() loginReqDto: LoginReqDto): Promise<LoginResDto>{
        const { ip, method, originalUrl } = req;
        const reqInfo = {
            ip,
            endpoint: '${method} ${originalUrl}',
            ua: req.headers['user-agent'] || '',
        };

        return this.authService.login(
            loginReqDto.email,
            loginReqDto.password,
            reqInfo,
        );
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<SignupResDto>{
        const user = await this.userService.createUser(createUserDto);
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        };
    }

    

}