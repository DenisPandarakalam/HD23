import { atom, useAtom } from "jotai";
import { ChatGPTMessage } from "./openai";

export const messageHistoryAtom = atom<ChatGPTMessage[]>([]);
