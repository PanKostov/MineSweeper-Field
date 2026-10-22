"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinesRandomPositionGenerator = void 0;
class MinesRandomPositionGenerator {
    generateRandomMinesPositions({ gridHeight, gridWidth, numberOfMines, }) {
        const minesPositions = new Set();
        for (let i = 0; i < numberOfMines; i++) {
            while (true) {
                const minePosition = this.getRandomInt({
                    min: 0,
                    max: gridHeight * gridWidth,
                });
                if (!minesPositions.has(minePosition)) {
                    minesPositions.add(minePosition);
                    break;
                }
            }
        }
        return minesPositions;
    }
    getRandomInt({ min, max }) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }
}
exports.MinesRandomPositionGenerator = MinesRandomPositionGenerator;
