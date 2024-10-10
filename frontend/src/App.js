import "./App.scss";
import { react, useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [fieldValue, setFieldValue] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [searchFilters, setSearchFilters] = useState({
    passports: true,
    ids: false,
  });
  async function handleSearch() {
    if (fieldValue.trim() === "") {
      return;
    }

    const response = await axios.get(
      `http://100.73.35.59:1111/?search=${fieldValue}&passports=${searchFilters.passports}&ids=${searchFilters.ids}`
    );
    setSearchResults(response.data);
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

  return (
    <div className="App">
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
        <div id="search_filter_container">
          <label>
            <input
              type="checkbox"
              name="passports"
              checked={searchFilters.passports}
              onChange={handleSearchFilterChange}
            />{" "}
            Passports
          </label>

          <label>
            <input
              type="checkbox"
              name="ids"
              checked={searchFilters.ids}
              onChange={handleSearchFilterChange}
            />{" "}
            IDs
          </label>
        </div>
      </div>
      <ResultsContainer
        searchQuery={fieldValue}
        searchResults={searchResults}
      />
    </div>
  );
}

const ResultsContainer = ({ searchQuery, searchResults }) => {
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    setActiveItem("");
  }, [searchResults]);

  return (
    <div id="results_container">
      <div id="result_items_container">
        {searchResults &&
          searchResults?.map((item) => (
            <div
              className={"result_item"}
              onClick={() => setActiveItem(item)}
              key={`${item.personal_number}-${item.passport_number}`}
              style={{
                border:
                  item.personal_number === activeItem?.personal_number
                    ? "1px solid #008000"
                    : "none",
              }}
            >
              <label>{item.first_name}</label>{" "}
              {item.middle_name && <label>{item.middle_name}</label>}
              <label>{item.last_name}</label>
            </div>
          ))}
      </div>
      <div id="selected_item_container">
        {activeItem && (
          <>
            <div className="grid-container">
              <label className="grid-item-key">Personal Number</label>
              <label className="grid-item">{activeItem.personal_number}</label>

              <label className="grid-item-key">Passport Number</label>
              <label className="grid-item">{activeItem.passport_number}</label>

              <label className="grid-item-key">First Name</label>
              <label className="grid-item">{activeItem.first_name}</label>
              {activeItem.middle_name && (
                <>
                  <label className="grid-item-key">Middle Name</label>
                  <label className="grid-item">{activeItem.middle_name}</label>
                </>
              )}
              <label className="grid-item-key">Last Name</label>
              <label className="grid-item">{activeItem.last_name}</label>

              <label className="grid-item-key">Birth Date</label>
              <label className="grid-item">{activeItem.date_of_birth}</label>

              <label className="grid-item-key">Place of Birth</label>
              <label className="grid-item">{activeItem.place_of_birth}</label>

              <label className="grid-item-key">Place of Living</label>
              <label className="grid-item">{activeItem.place_of_living}</label>

              <label className="grid-item-key">Phone Number</label>
              <label className="grid-item">{activeItem.phone_number}</label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
