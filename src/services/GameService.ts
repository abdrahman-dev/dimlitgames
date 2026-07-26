import { games as localGames } from "../data/games";
import type { Game } from "../types";

class GameService {
  private games: Game[] = localGames;

  async getGames(): Promise<Game[]> {
    return this.games;
  }

  async getFeatured(): Promise<Game | undefined> {
    return this.games.find((g) => g.featured);
  }

  async getById(id: string): Promise<Game | undefined> {
    return this.games.find((g) => g.id === id);
  }
}

export const gameService = new GameService();
