// Dans un composant parent
import React from "react";
import SearchForm from "./components/SearchForm";
import "./style/searchform.css";

function Search() {
  return (
    <div class="search-form">
      <SearchForm />
    </div>
  );
}

export default Search;
