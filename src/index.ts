import { InputFieldsValidator } from "./FieldInputValidator";
import { MineSweeperFieldCreator } from "./MineSweeperFieldCreator";
import { MinesInserter } from "./MinesInserter";
import { MinesRandomPositionGenerator } from "./MinesRandomPositionGenerator";
import { NeighboringMinesCountInserter } from "./NeighboringMinesCountInserter";

export class MineSweeper {
  run() {
    const args = process.argv.slice(2);

    const gridWidth = args[0];
    const gridHeight = args[1];
    const numberOfMines = args[2];

    InputFieldsValidator.validateGridInputFields({
      gridHeight,
      gridWidth,
      numberOfMines,
    });

    const minesRandomPositionCreator = new MinesRandomPositionGenerator();
    const minesInserter = new MinesInserter();
    const neighboringMinesCountInserter = new NeighboringMinesCountInserter();
    const minesFieldCreator = new MineSweeperFieldCreator(
      minesRandomPositionCreator,
      minesInserter,
      neighboringMinesCountInserter,
    );

    minesFieldCreator.createInitialField({
      gridHeight: Number(gridHeight),
      gridWidth: Number(gridWidth),
      numberOfMines: Number(numberOfMines),
    });

    console.log(args);
  }
}

const mineSweeper = new MineSweeper();
mineSweeper.run();
