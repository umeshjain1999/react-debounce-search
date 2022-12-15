import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const delayInterval = 1000;

  // Use the useState hook to create a state variable for the suggested values
  // and a function to update it
  const [suggestedValues, setSuggestedValues] = useState([]);

  // Use the useRef hook to create a reference to the timeout ID
  const timeoutId = React.useRef(null);

  // Define a function that fetches data from the REST API and updates the
  // suggested values state variable
  const fetchSuggestedValues = async (value) => {
    // Fetch the data from the REST API using the fetch API
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${value}`
    );
    const data = await response.json();
    // Update the suggested values state variable with the fetched data
    setSuggestedValues(data?.products);
  };

  // Define an onChange event handler for the search input field
  const handleSearchInputChange = (event) => {
    // Update the search keyword state variable with the value from the input field
    // setSearchKeyword(event.target.value);

    // Clear the timeout if it exists
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    // If the search input field is empty, clear the suggested values state variable
    if (!event.target.value) {
      setSuggestedValues([]);
    } else {
      // Use the setTimeout function to delay the call to the fetchSuggestedValues
      // function until 1000 milliseconds have passed since the user last typed
      // a character in the search input field
      timeoutId.current = setTimeout(() => {
        fetchSuggestedValues(event.target.value);
      }, delayInterval);
    }
  };

  // Use the handleSearchInputChange function as the onChange event handler
  // for the search input field
  return (
    <div>
      <h2>Debounce Search with delay of {delayInterval}</h2>
      <input
        type="text"
        onChange={handleSearchInputChange}
        placeholder="Type something..."
      />
      <ul>
        {suggestedValues.map((data) => {
          return <li key={data?.id}>{data?.title || "oops!"}</li>;
        })}
      </ul>
    </div>
  );
}
