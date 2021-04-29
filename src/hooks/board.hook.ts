import { useEffect, useState } from "react";
import { TrelloService } from "../core/api/trello.service";

const telloService = new TrelloService();

export const useGetCardHook = (cardId: string) => {
  const [card, setCard] = useState(null);

  useEffect(() => {});
};
