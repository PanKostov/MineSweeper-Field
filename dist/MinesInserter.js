"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinesInserter = void 0;
class MinesInserter {
    insertMinesPositions({ grid, gridWidth, minesPositions, }) {
        const minesGridPositions = new Array();
        for (const minePosition of minesPositions) {
            const { firstPosition, secondPosition } = this.getGridPositionFromMinePosition({ gridWidth, minePosition });
            grid[firstPosition][secondPosition] = "@";
            minesGridPositions.push({ firstPosition, secondPosition });
        }
        console.log("grid after mines ", grid);
        return minesGridPositions;
    }
    getGridPositionFromMinePosition({ gridWidth, minePosition, }) {
        const secondPosition = minePosition % gridWidth;
        const firstPosition = (minePosition - secondPosition) / gridWidth;
        return { firstPosition, secondPosition };
    }
}
exports.MinesInserter = MinesInserter;
