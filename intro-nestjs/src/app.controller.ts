import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDTO } from './dto';

// 임시 DB
const userDB = [];

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  readUser(@Param('id') id: string) {
    const found = userDB.find((obj) => {
      return obj.id === id;
    });

    if (!found) {
      throw new NotFoundException(`#${id} user is not founded...`);
    }
    return found;
  }

  @Post()
  createUser(@Body() userDTO: UserDTO): string {
    userDB.push(userDTO);
    return 'successfully created!';
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body('pwd') pwd: string) {
    const found = userDB.find((obj) => {
      return obj.id === id;
    });
    if (!found) {
      throw new NotFoundException(`#${id} user is not founded...`);
    }
    found.pwd = pwd;
    return 'success to change password!';
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const index = userDB.indexOf(id, 0);
    if (index < 0) {
      throw new NotFoundException(`#${id} user is not founded`);
    }
    userDB.splice(index, 1);
  }
}
