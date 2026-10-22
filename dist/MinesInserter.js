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
        return minesGridPositions;
    }
    getGridPositionFromMinePosition({ gridWidth, minePosition, }) {
        //For example secondPosition = 14 % 5 = 4 => [][4]
        const secondPosition = minePosition % gridWidth;
        //For example firstPosition = (14 - 4) / 5 = 10 / 5 = 2 => 14 position is equal to [2][4]
        const firstPosition = (minePosition - secondPosition) / gridWidth;
        return { firstPosition, secondPosition };
    }
}
exports.MinesInserter = MinesInserter;
