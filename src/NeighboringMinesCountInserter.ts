import { GridType, MinesGridPositionType } from "./Models";

export class NeighboringMinesCountInserter {
  insertNumberOfNeighboringMines({
    grid,
    minesGridPositions,
    gridHeight,
    gridWidth,
  }: {
    grid: GridType;
    minesGridPositions: MinesGridPositionType;
    gridHeight: number;
    gridWidth: number;
  }) {
    for (const mineGridPosition of minesGridPositions) {
      const { firstPosition, secondPosition } = mineGridPosition;

      this.increaseOrthogonalNeighborsMinesCount({
        firstPosition,
        secondPosition,
        grid,
        gridHeight,
        gridWidth,
      });

      this.increaseDiagonalNeighborsMinesCount({
        firstPosition,
        secondPosition,
        grid,
        gridHeight,
        gridWidth,
      });
    }
  }

  private increaseOrthogonalNeighborsMinesCount({
    firstPosition,
    secondPosition,
    grid,
    gridHeight,
    gridWidth,
  }: {
    grid: GridType;
    firstPosition: number;
    secondPosition: number;
    gridHeight: number;
    gridWidth: number;
  }) {
    if (
      firstPosition - 1 >= 0 &&
      grid[firstPosition - 1][secondPosition] !== "@"
    ) {
      this.incrementNeighborMineCount({
        grid,
        firstPosition: firstPosition - 1,
        secondPosition,
      });
    }

    if (
      firstPosition + 1 < gridHeight &&
      grid[firstPosition + 1][secondPosition] !== "@"
    ) {
      this.incrementNeighborMineCount({
        grid,
        firstPosition: firstPosition + 1,
        secondPosition,
      });
    }

    if (
      secondPosition - 1 >= 0 &&
      grid[firstPosition][secondPosition - 1] !== "@"
    ) {
      this.incrementNeighborMineCount({
        grid,
        firstPosition,
        secondPosition: secondPosition - 1,
      });
    }

    if (
      secondPosition + 1 < gridWidth &&
      grid[firstPosition][secondPosition + 1] !== "@"
    ) {
      this.incrementNeighborMineCount({
        grid,
        firstPosition,
        secondPosition: secondPosition + 1,
      });
    }
  }

  private increaseDiagonalNeighborsMinesCount({
    firstPosition,
    secondPosition,
    grid,
    gridHeight,
    gridWidth,
  }: {
    grid: GridType;
    firstPosition: number;
    secondPosition: number;
    gridHeight: number;
    gridWidth: number;
  }) {
    if (
      firstPosition - 1 >= 0 &&
      secondPosition - 1 >= 0 &&
      grid[firstPosition - 1][secondPosition - 1] !== "@"
    ) {
      this.incrementNeighborMineCount({
        grid,
        firstPosition: firstPosition - 1,
        secondPosition: secondPosition - 1,
      });
    }

    if (
      firstPosition + 1 < gridHeight &&
      secondPosition + 1 < gridWidth &&
      grid[firstPosition + 1][secondPosition + 1] !== "@"
    ) {
      this.incrementNeighborMineCount({
        grid,
        firstPosition: firstPosition + 1,
        secondPosition: secondPosition + 1,
      });
    }

    if (
      firstPosition + 1 < gridHeight &&
      secondPosition - 1 >= 0 &&
      grid[firstPosition + 1][secondPosition - 1] !== "@"
    ) {
      this.incrementNeighborMineCount({
        grid,
        firstPosition: firstPosition + 1,
        secondPosition: secondPosition - 1,
      });
    }

    if (
      firstPosition - 1 >= 0 &&
      secondPosition + 1 < gridWidth &&
      grid[firstPosition - 1][secondPosition + 1] !== "@"
    ) {
      this.incrementNeighborMineCount({
        grid,
        firstPosition: firstPosition - 1,
        secondPosition: secondPosition + 1,
      });
    }
  }

  private incrementNeighborMineCount({
    grid,
    firstPosition,
    secondPosition,
  }: {
    grid: GridType;
    firstPosition: number;
    secondPosition: number;
  }) {
    if (grid[firstPosition][secondPosition] === " ") {
      grid[firstPosition][secondPosition] = 1;
    } else if (typeof grid[firstPosition][secondPosition] === "number") {
      grid[firstPosition][secondPosition]++;
    } else {
      throw new Error("Invalid cell");
    }
  }
}
