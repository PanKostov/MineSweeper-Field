"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MinesInserter_1 = require("../MinesInserter");
describe("MinesInserter", () => {
    it("should insert mines in the correct grid positions", () => {
        const minesInserter = new MinesInserter_1.MinesInserter();
        const grid = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
        ];
        const minesPositions = new Set([0, 4, 8]);
        const result = minesInserter.insertMinesPositions({
            grid,
            gridWidth: 3,
            minesPositions,
        });
        expect(grid).toEqual([
            ["@", " ", " "],
            [" ", "@", " "],
            [" ", " ", "@"],
        ]);
        expect(result).toEqual([
            { firstPosition: 0, secondPosition: 0 },
            { firstPosition: 1, secondPosition: 1 },
            { firstPosition: 2, secondPosition: 2 },
        ]);
    });
});
