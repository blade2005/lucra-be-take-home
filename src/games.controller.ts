import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly appService: GamesService) { }

  @Get()
  async getAll() {
    return this.appService.findAll() ?? [];
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const game = await this.appService.findOneGame(id);

    if (!game) {
      throw new NotFoundException(`Game with id "${id}" not found`);
    }

    return game;
  }

  @Post()
  create(@Query('rows', ParseIntPipe) rows: number, @Query('columns', ParseIntPipe) columns: number) {
    console.debug('GamesController.create', { rows, columns });

    // TODO: custom validation pipe that checks for the values being greater than 0, prferabbly using something like zod or something.
    if (rows <= 0) {
      throw new Error(`Number of rows must be greater than 0. Recieved ${rows}`);
    }
    if (columns <= 0) {
      throw new Error(`Number of columns must be greater than 0. Recieved ${columns}`);
    }

    return this.appService.create(rows, columns);
  }
}
