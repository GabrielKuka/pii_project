import "./App.scss";
import { useState } from "react";
import SearchContainer from "./searchContainer";
import ResultsContainer from "./resultsContainer";

function App() {
  const [searchResults, setSearchResults] = useState(false);
  const [fieldValue, setFieldValue] = useState("");

  return (
    <div className="App">
      <SearchContainer
        fieldValue={fieldValue}
        setFieldValue={setFieldValue}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
      <ResultsContainer
        searchQuery={fieldValue}
        searchResults={searchResults}
      />
    </div>
  );
}

export default App;
