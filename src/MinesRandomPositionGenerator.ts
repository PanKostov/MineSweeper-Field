export class MinesRandomPositionGenerator {
  generateRandomMinesPositions({
    gridHeight,
    gridWidth,
    numberOfMines,
  }: {
    gridHeight: number;
    gridWidth: number;
    numberOfMines: number;
  }): Set<number> {
    const minesPositions = new Set<number>();
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

  private getRandomInt({ min, max }: { min: number; max: number }): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }
}
