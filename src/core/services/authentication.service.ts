import { TrelloService } from "../api/trello.service";
import { StorageService, STORAGE_KEYS } from "./storage.service";

export class AuthenticationService {
  private storageService: StorageService;
  private trelloService: TrelloService;

  constructor() {
    this.storageService = new StorageService();
    this.trelloService = new TrelloService();
  }

  login() {
    this.trelloService.authorize();
  }

  logout() {
    this.storageService.delete(STORAGE_KEYS.USER);
  }

  isAuthenticated() {
    return this.storageService.get(STORAGE_KEYS.USER);
  }

  async getUser() {
    const tokenFromQuery = this.getTokenFromQuery();
    if (tokenFromQuery) {
      return this.saveUser(tokenFromQuery);
    } else {
      return this.storageService.get(STORAGE_KEYS.USER);
    }
  }

  getTokenFromQuery() {
    const url = window.location.href;
    const tokenIndex = url.indexOf("#token");
    if (tokenIndex === -1) {
      return null;
    }
    return url.substring(tokenIndex + 7);
  }

  async saveUser(token) {
    try {
      const { username, id, fullName } = await this.trelloService.getUserInfo(
        token
      );
      const newUser = {
        username,
        id,
        token,
        fullName,
      };
      this.storageService.set(STORAGE_KEYS.USER, newUser);
      return newUser;
    } catch (e) {
      console.error("ERROR FETCHING USER", e);
      return null;
    }
  }
}
