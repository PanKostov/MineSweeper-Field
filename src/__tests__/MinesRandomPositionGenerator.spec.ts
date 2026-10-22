import { MinesRandomPositionGenerator } from "../MinesRandomPositionGenerator";

describe("MinesRandomPositionGenerator ", () => {
  let minesRandomPositionGenerator: MinesRandomPositionGenerator;

  beforeEach(() => {
    minesRandomPositionGenerator = new MinesRandomPositionGenerator();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should retry when a duplicate mine position is generated", () => {
    const randomSpy = jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0) // position 0
      .mockReturnValueOnce(0) // position 0
      .mockReturnValueOnce(0.5); // Math.floor(0.5 * (9 - 0) + 0) => Math.floor(4.5) => 4 position
    const positions = minesRandomPositionGenerator.generateRandomMinesPositions(
      {
        gridHeight: 3,
        gridWidth: 3,
        numberOfMines: 2,
      },
    );

    expect(positions).toEqual(new Set([0, 4]));
    expect(randomSpy).toHaveBeenCalledTimes(3);
  });

  it("should return position 0 for a single-cell grid with one mine", () => {
    const randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);

    const positions = minesRandomPositionGenerator.generateRandomMinesPositions({
      gridHeight: 1,
      gridWidth: 1,
      numberOfMines: 1,
    });

    expect(positions).toEqual(new Set([0]));
    expect(randomSpy).toHaveBeenCalledTimes(1);
  });

  it("should fill every position in a 2 x 2 grid with four mines", () => {
    const randomSpy = jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0) // position 0
      .mockReturnValueOnce(0.25) // position 1
      .mockReturnValueOnce(0.5) // position 2
      .mockReturnValueOnce(0.75); // position 3

    const positions = minesRandomPositionGenerator.generateRandomMinesPositions({
      gridHeight: 2,
      gridWidth: 2,
      numberOfMines: 4,
    });

    expect(positions).toEqual(new Set([0, 1, 2, 3]));
    expect(randomSpy).toHaveBeenCalledTimes(4);
  });
});
