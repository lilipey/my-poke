interface Pokemon {
  name: {
    fr: string;
  };
  nameToken?: string[];
}

function normalizeString(str: string): string[] {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/'/g, "")
      .toLowerCase()
      .split(/\s+/);
  }
function normalizeStringsArray(strings: string[]): string[] {
  return strings.map(str =>
      str
          .normalize("NFD") // Décompose les caractères en leurs formes de base et diacritiques
          .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques
          .replace(/'/g, '') // Supprime les apostrophes
          .toLowerCase() // Convertit en minuscules
  );
}
  // Lors du chargement des utilisateurs, on pré-calcule les tokens du nom complet
  function preprocessUsers(data: Pokemon[]): Pokemon[] {
    return data.map(pokemon => {
      const nameToken = normalizeString(pokemon.name.fr);
      // stocke les tokens dans une nouvelle propriété pour éviter de refaire le découpage à chaque filtrage
      pokemon.nameToken = nameToken;
      return pokemon;
    });
  }

export { normalizeString, normalizeStringsArray, preprocessUsers };