import { createCells, GamesService, makeCell } from "./games.service";
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Game, GameCell } from './entities';

describe('Game Service', function() {
  let gameService: GamesService;
  const mockGamesRepository = {
    findOneBy: jest.fn(() => null),
    save: jest.fn(() => null),
    find: jest.fn(() => null),
  };

  const mockGameCellsRepository = {
    findOneBy: jest.fn(() => null),
    save: jest.fn(() => null),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: getRepositoryToken(Game),
          useValue: mockGamesRepository,
        },
        {
          provide: getRepositoryToken(GameCell),
          useValue: mockGameCellsRepository,
        },
      ],
    }).compile();

    gameService = app.get<GamesService>(GamesService);
  });

  it('make a cell', () => {
    const cell = makeCell(0, 1);
    expect(cell).toBeInstanceOf(GameCell);
    expect(cell.yCoordinate).toEqual(1);
    expect(cell.xCoordinate).toEqual(0);
    expect(cell.isMine).toBeDefined();
    expect(typeof cell.isMine === 'boolean').toBeTruthy();
  });

  it('makes cells', () => {
    const cells = createCells(10, 5);
    expect(cells.length).toEqual(10);
    expect(cells[0].length).toEqual(5);
    cells.forEach((cols, row_idx) => {
      cols.forEach((cell, col_idx) => {
        expect(cell).toBeInstanceOf(GameCell);
        expect(cell.yCoordinate).toEqual(col_idx);
        expect(cell.xCoordinate).toEqual(row_idx);
        expect(cell.isMine).toBeDefined();
        expect(typeof cell.isMine === 'boolean').toBeTruthy();
      });
    });
  });
  it('create game', async () => {
    const result = await gameService.create(10, 5);
    expect(result).toBeDefined();
    expect(result.cells.length).toEqual(10 * 5);
    // Integration testing would do OOB call to DB and check that the cells were created accordingly
  });
});
