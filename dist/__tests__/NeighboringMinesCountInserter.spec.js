"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NeighboringMinesCountInserter_1 = require("../NeighboringMinesCountInserter");
describe("NeighboringMinesCountInserter", () => {
    let neighboringMinesCountInserter;
    let grid;
    beforeEach(() => {
        neighboringMinesCountInserter = new NeighboringMinesCountInserter_1.NeighboringMinesCountInserter();
        grid = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
        ];
    });
    it.each([
        {
            location: "the center",
            firstPosition: 1,
            secondPosition: 1,
            expectedGrid: [
                [1, 1, 1],
                [1, "@", 1],
                [1, 1, 1],
            ],
        },
        {
            location: "the top-left corner",
            firstPosition: 0,
            secondPosition: 0,
            expectedGrid: [
                ["@", 1, " "],
                [1, 1, " "],
                [" ", " ", " "],
            ],
        },
        {
            location: "the top-right corner",
            firstPosition: 0,
            secondPosition: 2,
            expectedGrid: [
                [" ", 1, "@"],
                [" ", 1, 1],
                [" ", " ", " "],
            ],
        },
        {
            location: "the bottom-left corner",
            firstPosition: 2,
            secondPosition: 0,
            expectedGrid: [
                [" ", " ", " "],
                [1, 1, " "],
                ["@", 1, " "],
            ],
        },
        {
            location: "the bottom-right corner",
            firstPosition: 2,
            secondPosition: 2,
            expectedGrid: [
                [" ", " ", " "],
                [" ", 1, 1],
                [" ", 1, "@"],
            ],
        },
        {
            location: "the top edge",
            firstPosition: 0,
            secondPosition: 1,
            expectedGrid: [
                [1, "@", 1],
                [1, 1, 1],
                [" ", " ", " "],
            ],
        },
        {
            location: "the bottom edge",
            firstPosition: 2,
            secondPosition: 1,
            expectedGrid: [
                [" ", " ", " "],
                [1, 1, 1],
                [1, "@", 1],
            ],
        },
        {
            location: "the left edge",
            firstPosition: 1,
            secondPosition: 0,
            expectedGrid: [
                [1, 1, " "],
                ["@", 1, " "],
                [1, 1, " "],
            ],
        },
        {
            location: "the right edge",
            firstPosition: 1,
            secondPosition: 2,
            expectedGrid: [
                [" ", 1, 1],
                [" ", 1, "@"],
                [" ", 1, 1],
            ],
        },
    ])("should count neighboring mines for a mine at $location", ({ firstPosition, secondPosition, expectedGrid }) => {
        grid[firstPosition][secondPosition] = "@";
        neighboringMinesCountInserter.insertNumberOfNeighboringMines({
            grid,
            minesGridPositions: [{ firstPosition, secondPosition }],
            gridHeight: 3,
            gridWidth: 3,
        });
        expect(grid).toEqual(expectedGrid);
    });
    it("should accumulate counts from adjacent mines without overwriting them", () => {
        grid = [
            ["@", "@", " "],
            [" ", " ", " "],
        ];
        neighboringMinesCountInserter.insertNumberOfNeighboringMines({
            grid,
            minesGridPositions: [
                { firstPosition: 0, secondPosition: 0 },
                { firstPosition: 0, secondPosition: 1 },
            ],
            gridHeight: 2,
            gridWidth: 3,
        });
        expect(grid).toEqual([
            ["@", "@", 1],
            [2, 2, 1],
        ]);
    });
    it("should count all eight mines surrounding a cell", () => {
        grid = [
            ["@", "@", "@"],
            ["@", " ", "@"],
            ["@", "@", "@"],
        ];
        neighboringMinesCountInserter.insertNumberOfNeighboringMines({
            grid,
            minesGridPositions: [
                { firstPosition: 0, secondPosition: 0 },
                { firstPosition: 0, secondPosition: 1 },
                { firstPosition: 0, secondPosition: 2 },
                { firstPosition: 1, secondPosition: 0 },
                { firstPosition: 1, secondPosition: 2 },
                { firstPosition: 2, secondPosition: 0 },
                { firstPosition: 2, secondPosition: 1 },
                { firstPosition: 2, secondPosition: 2 },
            ],
            gridHeight: 3,
            gridWidth: 3,
        });
        expect(grid).toEqual([
            ["@", "@", "@"],
            ["@", 8, "@"],
            ["@", "@", "@"],
        ]);
    });
    it("should leave a grid without mines unchanged", () => {
        neighboringMinesCountInserter.insertNumberOfNeighboringMines({
            grid,
            minesGridPositions: [],
            gridHeight: 3,
            gridWidth: 3,
        });
        expect(grid).toEqual([
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
        ]);
    });
    it("should leave a fully mined grid unchanged", () => {
        grid = [
            ["@", "@"],
            ["@", "@"],
        ];
        neighboringMinesCountInserter.insertNumberOfNeighboringMines({
            grid,
            minesGridPositions: [
                { firstPosition: 0, secondPosition: 0 },
                { firstPosition: 0, secondPosition: 1 },
                { firstPosition: 1, secondPosition: 0 },
                { firstPosition: 1, secondPosition: 1 },
            ],
            gridHeight: 2,
            gridWidth: 2,
        });
        expect(grid).toEqual([
            ["@", "@"],
            ["@", "@"],
        ]);
    });
    it.each([
        {
            name: "a single-cell grid",
            initialGrid: [["@"]],
            expectedGrid: [["@"]],
        },
        {
            name: "a single-row grid",
            initialGrid: [["@", " ", " "]],
            expectedGrid: [["@", 1, " "]],
        },
        {
            name: "a single-column grid",
            initialGrid: [["@"], [" "], [" "]],
            expectedGrid: [["@"], [1], [" "]],
        },
    ])("should handle $name", ({ initialGrid, expectedGrid }) => {
        neighboringMinesCountInserter.insertNumberOfNeighboringMines({
            grid: initialGrid,
            minesGridPositions: [{ firstPosition: 0, secondPosition: 0 }],
            gridHeight: initialGrid.length,
            gridWidth: initialGrid[0].length,
        });
        expect(initialGrid).toEqual(expectedGrid);
    });
});
