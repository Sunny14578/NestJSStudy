import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto, SignupResDto } from '../dto';
import { UserService, AuthService } from '../services';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ){}

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