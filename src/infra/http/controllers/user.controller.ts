import {JwtAuthGuard} from '@infra/auth/guards/jwt-auth.guard';
import {PrismaUserMapper} from '@infra/database/prisma/mappers/prisma-users.mapper';
import {Body, Controller, Get, Put, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {GetUser} from '@useCases/user/get-user';
import {UpdateUserEmail} from '@useCases/user/update-user-email';
import {UpdateUserEmailDto} from '../dtos/update-user-email.dto';
import {AuthenticatedRequest} from '../requests/authenticated.request';

@Controller('user')
@ApiTags('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private getUser: GetUser,
    private updateUserEmail: UpdateUserEmail,
  ) {}

  @Get('me')
  @ApiOperation({description: 'Get authenticated user'})
  async me(
    @Req() request: AuthenticatedRequest,
  ): Promise<{id: string; firstname: string; lastname: string; email: string}> {
    const user = await this.getUser.execute(request.user.id);

    return PrismaUserMapper.toPrisma(user);
  }

  @Put('email')
  @ApiOperation({description: 'Update user e-mail'})
  async updateEmail(
    @Req() request: AuthenticatedRequest,
    @Body() {email}: UpdateUserEmailDto,
  ): Promise<void> {
    await this.updateUserEmail.execute({id: request.user.id, email});
  }
}
