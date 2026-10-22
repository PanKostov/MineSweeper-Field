import { GridCoordinates, GridType, MinesGridPositionType } from "./Models";

export class MinesInserter {
  insertMinesPositions({
    grid,
    gridWidth,
    minesPositions,
  }: {
    grid: GridType;
    gridWidth: number;
    minesPositions: Set<number>;
  }): MinesGridPositionType {
    const minesGridPositions: MinesGridPositionType = new Array();

    for (const minePosition of minesPositions) {
      const { firstPosition, secondPosition } =
        this.getGridPositionFromMinePosition({ gridWidth, minePosition });
      grid[firstPosition][secondPosition] = "@";
      minesGridPositions.push({ firstPosition, secondPosition });
    }

    return minesGridPositions;
  }

  private getGridPositionFromMinePosition({
    gridWidth,
    minePosition,
  }: {
    gridWidth: number;
    minePosition: number;
  }): GridCoordinates {
    //For example secondPosition = 14 % 5 = 4 => [][4]
    const secondPosition = minePosition % gridWidth;

    //For example firstPosition = (14 - 4) / 5 = 10 / 5 = 2 => 14 position is equal to [2][4]
    const firstPosition = (minePosition - secondPosition) / gridWidth;

    return { firstPosition, secondPosition };
  }
}
