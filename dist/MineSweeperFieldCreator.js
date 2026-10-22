"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MineSweeperFieldCreator = void 0;
class MineSweeperFieldCreator {
    minesRandomPositionGenerator;
    minesInserter;
    neighboringMinesCountInserter;
    grid = new Array();
    constructor(minesRandomPositionGenerator, minesInserter, neighboringMinesCountInserter) {
        this.minesRandomPositionGenerator = minesRandomPositionGenerator;
        this.minesInserter = minesInserter;
        this.neighboringMinesCountInserter = neighboringMinesCountInserter;
    }
    createInitialField({ gridHeight, gridWidth, numberOfMines, }) {
        this.grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(" "));
        const minesPositions = this.minesRandomPositionGenerator.generateRandomMinesPositions({
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
    logGrid(gridHeight, gridWidth) {
        for (let i = 0; i < gridHeight; i++) {
            for (let j = 0; j < gridWidth; j++) {
                if (typeof this.grid[i][j] !== "number") {
                    process.stdout.write(JSON.stringify(this.grid[i][j]));
                }
                else {
                    process.stdout.write(JSON.stringify(String(this.grid[i][j])));
                }
                process.stdout.write("|");
            }
            console.log("\n");
        }
    }
}
exports.MineSweeperFieldCreator = MineSweeperFieldCreator;
