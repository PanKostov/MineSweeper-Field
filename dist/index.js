"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MineSweeper = void 0;
const FieldInputValidator_1 = require("./FieldInputValidator");
const MineSweeperFieldCreator_1 = require("./MineSweeperFieldCreator");
const MinesInserter_1 = require("./MinesInserter");
const MinesRandomPositionGenerator_1 = require("./MinesRandomPositionGenerator");
const NeighboringMinesCountInserter_1 = require("./NeighboringMinesCountInserter");
class MineSweeper {
    run() {
        const args = process.argv.slice(2);
        const gridWidth = args[0];
        const gridHeight = args[1];
        const numberOfMines = args[2];
        FieldInputValidator_1.InputFieldsValidator.validateGridInputFields({
            gridHeight,
            gridWidth,
            numberOfMines,
        });
        const minesRandomPositionCreator = new MinesRandomPositionGenerator_1.MinesRandomPositionGenerator();
        const minesInserter = new MinesInserter_1.MinesInserter();
        const neighboringMinesCountInserter = new NeighboringMinesCountInserter_1.NeighboringMinesCountInserter();
        const minesFieldCreator = new MineSweeperFieldCreator_1.MineSweeperFieldCreator(minesRandomPositionCreator, minesInserter, neighboringMinesCountInserter);
        minesFieldCreator.createInitialField({
            gridHeight: Number(gridHeight),
            gridWidth: Number(gridWidth),
            numberOfMines: Number(numberOfMines),
        });
        console.log(args);
    }
}
exports.MineSweeper = MineSweeper;
const mineSweeper = new MineSweeper();
mineSweeper.run();
