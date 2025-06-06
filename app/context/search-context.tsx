"use client";
import React, { createContext, FC, useContext, useState } from "react";

const SearchContext = createContext<{
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}>({
  searchTerm: "",
  setSearchTerm: () => {},
});

export const useSearch = () => useContext(SearchContext);

export const SearchProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
