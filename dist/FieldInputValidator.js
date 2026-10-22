"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputFieldsValidator = void 0;
class InputFieldsValidator {
    static validateGridInputFields({ gridHeight, gridWidth, numberOfMines, }) {
        const numberGridHeight = Number(gridHeight);
        const numberGridWidth = Number(gridWidth);
        const numberNumberOfMines = Number(numberOfMines);
        if (isNaN(numberGridHeight) || !Number.isInteger(numberGridHeight)) {
            throw new Error("Grid height value should be numeric whole number!");
        }
        if (isNaN(numberGridWidth) || !Number.isInteger(numberGridWidth)) {
            throw new Error("Grid width value should be numeric whole number!");
        }
        if (isNaN(numberNumberOfMines) || !Number.isInteger(numberNumberOfMines)) {
            throw new Error("Number of mines value should be numeric whole number!");
        }
        if (numberNumberOfMines > numberGridHeight * numberGridWidth) {
            throw new Error("Number of mines should be lower than the grid");
        }
    }
}
exports.InputFieldsValidator = InputFieldsValidator;
