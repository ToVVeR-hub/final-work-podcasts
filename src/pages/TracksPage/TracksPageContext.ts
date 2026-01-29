import { createContext } from "react";
export const TracksPageContext = createContext<{
  query: string;
  setQuery: (value: string) => void;
} | null>(null);
