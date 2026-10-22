import { MinesInserter } from "./MinesInserter";
import { MinesRandomPositionGenerator } from "./MinesRandomPositionGenerator";
import { GridFieldsParams, GridType } from "./Models";
import { NeighboringMinesCountInserter } from "./NeighboringMinesCountInserter";

export class MineSweeperFieldCreator {
  private grid: GridType = new Array();

  constructor(
    private readonly minesRandomPositionGenerator: MinesRandomPositionGenerator,
    private readonly minesInserter: MinesInserter,
    private readonly neighboringMinesCountInserter: NeighboringMinesCountInserter,
  ) {}

  createInitialField({
    gridHeight,
    gridWidth,
    numberOfMines,
  }: GridFieldsParams) {
    this.grid = Array.from({ length: gridHeight }, () =>
      Array(gridWidth).fill(" "),
    );

    const minesPositions =
      this.minesRandomPositionGenerator.generateRandomMinesPositions({
        gridHeight,
        gridWidth,
        numberOfMines,
      });

    const minesGridPositions = this.minesInserter.insertMinesPositions({
      grid: this.grid,
      gridWidth,
      minesPositions,
    });

    this.neighboringMinesCountInserter.insertNumberOfNeighboringMines({
      grid: this.grid,
      minesGridPositions,
      gridHeight,
      gridWidth,
    });

    this.logGrid(gridHeight, gridWidth);
  }

  private logGrid(gridHeight: number, gridWidth: number): void {
    for (let i = 0; i < gridHeight; i++) {
      for (let j = 0; j < gridWidth; j++) {
        if (typeof this.grid[i][j] !== "number") {
          process.stdout.write(JSON.stringify(this.grid[i][j]));
        } else {
          process.stdout.write(JSON.stringify(String(this.grid[i][j])));
        }
        process.stdout.write("|");
      }
      console.log("\n");
    }
  }
}
