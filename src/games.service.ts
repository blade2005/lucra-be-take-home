import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Game, GameCell } from './entities';
import { MINE_THRESHOLD } from './constants';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,

    @InjectRepository(GameCell)
    private gameCellsRepository: Repository<GameCell>,
  ) {}

  async findOneGame(id: string) {
    return this.gamesRepository.findOneBy({ id });
  }

  async findAll() {
    return this.gamesRepository.find();
  }

  async create(rows: number, columns: number) {
    console.debug('GamesService.create', { columns, rows });

    const game = new Game();
    game.columns = columns;
    game.rows = rows;

    const cells = createCells(rows, columns);
    // TODO: Implement neighboring bomb logic

    game.cells = cells.flat();
    await this.gamesRepository.save(game);
    return game;
  }
}

/**
 * Create matrix of GameCell based on rows and columns provided
 */
export function createCells(rows: number, columns: number): GameCell[][] {
  return new Array(rows)
    .fill(null)
    .map((_, row_idx) =>
      new Array(columns)
        .fill(null)
        .map((_, col_idx) => makeCell(row_idx, col_idx)),
    );
}

/**
 * Create a single GameCell for the x and y coordinate provided.
 */
export function makeCell(x: number, y: number): GameCell {
  const cell = new GameCell();
  cell.xCoordinate = x;
  cell.yCoordinate = y;
  cell.isMine = Math.random() > MINE_THRESHOLD;
  return cell;
}
