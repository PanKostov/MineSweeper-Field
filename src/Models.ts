type Cell = number | "@" | " ";
export type GridType = Array<Array<Cell>>;

export interface GridFieldsParams {
  gridHeight: number;
  gridWidth: number;
  numberOfMines: number;
}

export interface GridCoordinates {
  firstPosition: number;
  secondPosition: number;
}

export type MinesGridPositionType = Array<GridCoordinates>;
