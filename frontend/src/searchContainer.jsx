import "./searchcontainer.scss";
import { useState } from "react";
import axios from "axios";

const SearchContainer = ({
  fieldValue,
  setFieldValue,
  searchResults,
  setSearchResults,
}) => {
  const [searchFilters, setSearchFilters] = useState({
    passports: true,
    ids: false,
  });

  async function handleSearch() {
    if (fieldValue.trim() === "") {
      return;
    }

    const response = await axios.get(
      // Port 1234 for testing
      `http://100.73.35.59:1111/?search=${fieldValue}&passports=${searchFilters.passports}&ids=${searchFilters.ids}`
    );
    if (response.status == 200) {
      const data = response?.data?.sort((a, b) => (a.type > b.type ? 1 : -1));
      setSearchResults(data);
    }
  }

  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleSearch();
    }
  }

  function handleSearchFilterChange(e) {
    const { name, checked } = e.target;
    setSearchFilters((prevState) => ({ ...prevState, [name]: checked }));
  }

  function resetSearch() {
    setSearchResults(false);
    setFieldValue("");
  }

  return (
    <div id="search_container">
      <input
        type="text"
        value={fieldValue}
        onChange={(e) => setFieldValue(e.target.value)}
        id="search_field"
        onKeyDown={handleKeyDown}
      />
      <input
        type="button"
        value="Search"
        id="search_button"
        onClick={handleSearch}
      />
      <div id="search_options_container">
        <label className={"search_filter_label"}>
          <input
            type="checkbox"
            name="passports"
            checked={searchFilters.passports}
            onChange={handleSearchFilterChange}
          />{" "}
          <span>Passports</span>
        </label>

        <label className={"search_filter_label"}>
          <input
            type="checkbox"
            name="ids"
            checked={searchFilters.ids}
            onChange={handleSearchFilterChange}
          />{" "}
          <span>IDs</span>
        </label>
        <button id="clear_search_button" onClick={resetSearch}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchContainer;
