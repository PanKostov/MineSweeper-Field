export class InputFieldsValidator {
  static validateGridInputFields({
    gridHeight,
    gridWidth,
    numberOfMines,
  }: {
    gridHeight: string;
    gridWidth: string;
    numberOfMines: string;
  }) {
    const numberGridHeight = Number(gridHeight);
    const numberGridWidth = Number(gridWidth);
    const numberNumberOfMines = Number(numberOfMines);

    if (numberGridHeight > 1000 || numberGridWidth > 1000) {
      throw new Error("Grid height or width should not be more than 1000");
    }

    if (
      isNaN(numberGridHeight) ||
      !Number.isInteger(numberGridHeight) ||
      numberGridHeight <= 0
    ) {
      throw new Error(
        "Grid height value should be a positive numeric whole number!",
      );
    }

    if (
      isNaN(numberGridWidth) ||
      !Number.isInteger(numberGridWidth) ||
      numberGridWidth <= 0
    ) {
      throw new Error(
        "Grid width value should be a positive numeric whole number!",
      );
    }

    if (
      isNaN(numberNumberOfMines) ||
      !Number.isInteger(numberNumberOfMines) ||
      numberNumberOfMines <= 0
    ) {
      throw new Error(
        "Number of mines value should be a positive numeric whole number!",
      );
    }

    if (numberNumberOfMines > numberGridHeight * numberGridWidth) {
      throw new Error(
        "Number of mines should be lower or equal than the grid length!",
      );
    }
  }
}
