"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FieldInputValidator_1 = require("../FieldInputValidator");
describe("InputFieldsValidator", () => {
    const validInput = {
        gridHeight: "3",
        gridWidth: "4",
        numberOfMines: "5",
    };
    describe("successful scenarios", () => {
        it("should accept positive whole numbers with fewer mines than cells", () => {
            expect(() => FieldInputValidator_1.InputFieldsValidator.validateGridInputFields(validInput)).not.toThrow();
        });
        it("should accept a single-cell grid with one mine", () => {
            expect(() => FieldInputValidator_1.InputFieldsValidator.validateGridInputFields({
                gridHeight: "1",
                gridWidth: "1",
                numberOfMines: "1",
            })).not.toThrow();
        });
        it("should accept a mine in every grid cell", () => {
            expect(() => FieldInputValidator_1.InputFieldsValidator.validateGridInputFields({
                ...validInput,
                numberOfMines: "12",
            })).not.toThrow();
        });
    });
    describe("unsuccessful scenarios", () => {
        describe.each([
            {
                field: "gridHeight",
                error: "Grid height value should be a positive numeric whole number!",
            },
            {
                field: "gridWidth",
                error: "Grid width value should be a positive numeric whole number!",
            },
            {
                field: "numberOfMines",
                error: "Number of mines value should be a positive numeric whole number!",
            },
        ])("$field", ({ field, error }) => {
            it.each([
                "abc",
                "NaN",
                "",
                " ",
                "0",
                "-1",
                "1.5",
                "Infinity",
                "-Infinity",
            ])("should reject %p", (value) => {
                expect(() => FieldInputValidator_1.InputFieldsValidator.validateGridInputFields({
                    ...validInput,
                    [field]: value,
                })).toThrow(error);
            });
        });
        it("should reject more mines than grid cells", () => {
            expect(() => FieldInputValidator_1.InputFieldsValidator.validateGridInputFields({
                ...validInput,
                numberOfMines: "13",
            })).toThrow("Number of mines should be lower or equal than the grid length!");
        });
    });
});
