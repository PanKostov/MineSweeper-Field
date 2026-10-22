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
        console.log("Initial empty grid: ", this.grid);
        const minesPositions = this.minesRandomPositionGenerator.generateRandomMinesPositions({
            gridHeight,
            gridWidth,
            numberOfMines,
        });
        console.log("All mines positions: ", minesPositions);
        const minesGridPositions = this.minesInserter.insertMinesPositions({
            grid: this.grid,
            gridWidth,
            minesPositions,
        });
        console.log("grid after mines 2", this.grid);
        this.neighboringMinesCountInserter.insertNumberOfNeighboringMines({
            grid: this.grid,
            minesGridPositions,
            gridHeight,
            gridWidth,
        });
        console.log("Final field. ", this.grid);
        console.log("Final ");
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
