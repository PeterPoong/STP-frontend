// src/Components/StudentComp/SearchResult.jsx
import React from "react";
import "../../css/StudentCss/SearchResult/SearchResultList.css";

export const SearchResult = ({ result }) => {
  return (
    <div className="search-result">
      <span>{result}</span>
    </div>
  );
};
