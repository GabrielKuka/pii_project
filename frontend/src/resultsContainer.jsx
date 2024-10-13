import { useState, useEffect } from "react";
import "./resultscontainer.scss";

const ResultsContainer = ({ searchQuery, searchResults }) => {
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    setActiveItem("");
  }, [searchResults]);

  return (
    <div id="results_container">
      <div id="left_pane_container">
        {searchResults && (
          <div id={"summary_card"}>
            <label>{searchResults.length} total search results.</label>
          </div>
        )}
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

export default ResultsContainer;
