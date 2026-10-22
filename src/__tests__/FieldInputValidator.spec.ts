import { InputFieldsValidator } from "../FieldInputValidator";

describe("InputFieldsValidator", () => {
  const validInput = {
    gridHeight: "3",
    gridWidth: "4",
    numberOfMines: "5",
  };

  describe("successful scenarios", () => {
    it("should accept positive whole numbers with fewer mines than cells", () => {
      expect(() =>
        InputFieldsValidator.validateGridInputFields(validInput),
      ).not.toThrow();
    });

    it("should accept a single-cell grid with one mine", () => {
      expect(() =>
        InputFieldsValidator.validateGridInputFields({
          gridHeight: "1",
          gridWidth: "1",
          numberOfMines: "1",
        }),
      ).not.toThrow();
    });

    it("should accept a mine in every grid cell", () => {
      expect(() =>
        InputFieldsValidator.validateGridInputFields({
          ...validInput,
          numberOfMines: "12",
        }),
      ).not.toThrow();
    });
  });
});
