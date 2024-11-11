import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { retry } from 'rxjs';
import { CoffeesService } from './coffees.service';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { Permission } from '../iam/authorization/permission.type';
import {
  Permissions,
  PERMISSIONS_KEY,
} from '../iam/authorization/decorators/permissions.decorator';
import { AuthType } from '../iam/authentication/enums/auth-type.enum';
import { Auth } from '../iam/authentication/decorators/auth.decorator';

@Auth(AuthType.Bearer, AuthType.ApiKey)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Permissions(Permission.GET_COFFEE)
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(@ActiveUser() user) {
    console.log(user);
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll();
  }

  // @Roles(Role.Admin)
  @Permissions(Permission.GET_COFFEE)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  // @Roles(Role.Admin)
  @Permissions(Permission.CREATE_COFFEE)
  @Post()
  create(@Body() body) {
    return this.coffeesService.create(body);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.coffeesService.update(id, body);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
