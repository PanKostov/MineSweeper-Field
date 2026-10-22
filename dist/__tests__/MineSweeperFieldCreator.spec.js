"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MineSweeperFieldCreator_1 = require("../MineSweeperFieldCreator");
const MinesInserter_1 = require("../MinesInserter");
const MinesRandomPositionGenerator_1 = require("../MinesRandomPositionGenerator");
const NeighboringMinesCountInserter_1 = require("../NeighboringMinesCountInserter");
describe("MineSweeperFieldCreator", () => {
    const input = { gridHeight: 2, gridWidth: 3, numberOfMines: 1 };
    let mineSweeperFieldCreator;
    let minesRandomPositionGenerator;
    let minesPositions;
    let minesGridPositions;
    let generateMines;
    let insertMines;
    let insertNeighborCounts;
    let stdoutWrite;
    let consoleLog;
    beforeEach(() => {
        minesRandomPositionGenerator = new MinesRandomPositionGenerator_1.MinesRandomPositionGenerator();
        const minesInserter = new MinesInserter_1.MinesInserter();
        const neighboringMinesCountInserter = new NeighboringMinesCountInserter_1.NeighboringMinesCountInserter();
        minesPositions = new Set([0]);
        minesGridPositions = [{ firstPosition: 0, secondPosition: 0 }];
        generateMines = jest
            .spyOn(minesRandomPositionGenerator, "generateRandomMinesPositions")
            .mockReturnValue(minesPositions);
        insertMines = jest
            .spyOn(minesInserter, "insertMinesPositions")
            .mockReturnValue(minesGridPositions);
        insertNeighborCounts = jest
            .spyOn(neighboringMinesCountInserter, "insertNumberOfNeighboringMines")
            .mockImplementation(() => { });
        stdoutWrite = jest.spyOn(process.stdout, "write").mockReturnValue(true);
        consoleLog = jest.spyOn(console, "log").mockImplementation(() => { });
        mineSweeperFieldCreator = new MineSweeperFieldCreator_1.MineSweeperFieldCreator(minesRandomPositionGenerator, minesInserter, neighboringMinesCountInserter);
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe("successful scenarios", () => {
        it.each([
            { gridHeight: 1, gridWidth: 1, expectedGrid: [[" "]] },
            { gridHeight: 1, gridWidth: 3, expectedGrid: [[" ", " ", " "]] },
            { gridHeight: 3, gridWidth: 1, expectedGrid: [[" "], [" "], [" "]] },
            {
                gridHeight: 2,
                gridWidth: 3,
                expectedGrid: [
                    [" ", " ", " "],
                    [" ", " ", " "],
                ],
            },
        ])("should create a $gridHeight x $gridWidth empty grid with independent rows", ({ gridHeight, gridWidth, expectedGrid }) => {
            mineSweeperFieldCreator.createInitialField({
                gridHeight,
                gridWidth,
                numberOfMines: 1,
            });
            const grid = insertMines.mock.calls[0][0].grid;
            expect(grid).toEqual(expectedGrid);
            expect(new Set(grid).size).toBe(gridHeight);
        });
        it("should pass grid dimensions, mine positions and coordinates to the dependencies", () => {
            mineSweeperFieldCreator.createInitialField(input);
            expect(generateMines).toHaveBeenCalledTimes(1);
            expect(generateMines).toHaveBeenCalledWith(input);
            expect(insertMines).toHaveBeenCalledTimes(1);
            expect(insertMines).toHaveBeenCalledWith({
                grid: [
                    [" ", " ", " "],
                    [" ", " ", " "],
                ],
                gridWidth: 3,
                minesPositions,
            });
            const grid = insertMines.mock.calls[0][0].grid;
            expect(insertNeighborCounts).toHaveBeenCalledTimes(1);
            expect(insertNeighborCounts).toHaveBeenCalledWith({
                grid,
                minesGridPositions,
                gridHeight: 2,
                gridWidth: 3,
            });
            expect(insertNeighborCounts.mock.calls[0][0].grid).toBe(grid);
        });
        it("should create a fresh grid when called again with different dimensions", () => {
            mineSweeperFieldCreator.createInitialField(input);
            const firstGrid = insertMines.mock.calls[0][0].grid;
            firstGrid[0][0] = "@";
            mineSweeperFieldCreator.createInitialField({
                gridHeight: 1,
                gridWidth: 2,
                numberOfMines: 1,
            });
            const secondGrid = insertMines.mock.calls[1][0].grid;
            expect(secondGrid).not.toBe(firstGrid);
            expect(secondGrid[0]).not.toBe(firstGrid[0]);
            expect(secondGrid).toEqual([[" ", " "]]);
            expect(firstGrid).toEqual([
                ["@", " ", " "],
                [" ", " ", " "],
            ]);
        });
        it("should print the completed grid with mines, neighbor counts and empty cells", () => {
            mineSweeperFieldCreator = new MineSweeperFieldCreator_1.MineSweeperFieldCreator(minesRandomPositionGenerator, new MinesInserter_1.MinesInserter(), new NeighboringMinesCountInserter_1.NeighboringMinesCountInserter());
            mineSweeperFieldCreator.createInitialField(input);
            const printedCells = stdoutWrite.mock.calls
                .map(([chunk]) => chunk)
                .join("");
            expect(printedCells).toBe('"@"|"1"|" "|"1"|"1"|" "|');
            expect(consoleLog).toHaveBeenCalledTimes(2);
            expect(consoleLog).toHaveBeenNthCalledWith(1, "\n");
            expect(consoleLog).toHaveBeenNthCalledWith(2, "\n");
        });
    });
});
