import { BoardModel } from "../../models/board.model";
import { StorageService, STORAGE_KEYS } from "./storage.service";

const MAX_RECENT_BOARDS = 4;

const localStorageService = new StorageService();
export const getRecentBoards = (): string[] => localStorageService.get(STORAGE_KEYS.RECENT_BOARDS) || []

export const pushRecentBoard = (board: BoardModel) => {
    const recentBoards = getRecentBoards();
    if (recentBoards.length > MAX_RECENT_BOARDS) {
        recentBoards.pop();
    }
    recentBoards.unshift(board.id);
    localStorageService.set(STORAGE_KEYS.RECENT_BOARDS, recentBoards);
    return recentBoards;
}