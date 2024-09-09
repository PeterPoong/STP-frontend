// src/Components/StudentComp/SearchResultsList.jsx
import React from "react";
import "../../css/StudentCss/SearchResult/SearchResultList.css";
import { SearchResult } from "./SearchResult";

const SearchResultsList = ({ results, onResultClick }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => (
        <div key={id} onClick={() => onResultClick(result)}>
          <SearchResult result={result.name} />
        </div>
      ))}
    </div>
  );
};

export default SearchResultsList;
