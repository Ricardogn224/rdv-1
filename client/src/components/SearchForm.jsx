import { useState } from "react";

function SearchForm() {
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");

  const handleSearch = () => {
    // Vous pouvez gérer la logique de recherche ici en utilisant les valeurs de searchTerm1 et searchTerm2.
    // Par exemple, vous pouvez les envoyer à une page de résultats.
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Recherchez un établissement, un nom, une spécialité..."
        value={searchTerm1}
        onChange={(e) => setSearchTerm1(e.target.value)}
      />
      
      <input
        type="text"
        placeholder="Où ? (ville, adresse...)"
        value={searchTerm2}
        onChange={(e) => setSearchTerm2(e.target.value)}
      />
      <button>Rechercher</button>
    </form>
  );
}

export default SearchForm;