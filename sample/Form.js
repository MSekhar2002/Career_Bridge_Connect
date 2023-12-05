import React, { useState, useEffect } from "react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

const Form = () => {
  const [places, setPlaces] = useState([]);

  function onPlaceSelect(value) {
    console.log(value);
  }

  function onSuggestionChange(value) {
    console.log(value);
  }

  const apiKey = "c12f1605ab0942a59896a2fa3248321c";
  const postalCode = "636808"; // Replace with your postal code
  const type = "city"; // Replace with the appropriate type
  const language = "en";

  useEffect(() => {
    // Step 1: Geocode the postal code to get its location
    fetch(
      `https://api.geoapify.com/v1/geocode?postal_code=${postalCode}&apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const { lat, lon } = data.features[0].geometry;

        // Step 2: Explore nearby places using the obtained location
        return fetch(
          `https://api.geoapify.com/v1/nearby?lat=${12.21597222}&lon=${78.11838889}&radius=1000&apiKey=${apiKey}`
        );
      })
      .then((response) => response.json())
      .then((placesData) => {
        setPlaces(placesData.features);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [apiKey, postalCode, type, language]);

  return (
    <GeoapifyContext apiKey={apiKey}>
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter address here"
        type={type}
        lang={language}
        position="relative"
        countryCodes=""
        limit={10}
        value=""
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggestionChange}
      />

      {/* Display the list of places */}
      <ul>
        {places.map((place) => (
          <li key={place.properties.id}>{place.properties.formatted}</li>
        ))}
      </ul>
    </GeoapifyContext>
  );
};

export default Form;
