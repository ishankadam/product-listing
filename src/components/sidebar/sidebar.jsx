import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Slider,
} from "@mui/material";
import { availability, brands, categories } from "../../commom";

const SidebarFilter = ({ filter, setFilter }) => {
  const [categoriesChecked, setCategoriesChecked] = useState({});
  const [brandsChecked, setBrandsChecked] = useState({});
  const [availabilityChecked, setAvailabilityChecked] = useState({});
  const [priceRange, setPriceRange] = useState([0, 500]);

  const handleCheckboxChange = (setState, type) => (event) => {
    const { name, checked } = event.target;

    // Update the local checked state
    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

    // Update the global filter state
    setFilter((prevState) => {
      const updatedFilter = { ...prevState };

      // If the checkbox is unchecked, remove it from the filter
      if (!checked) {
        const { [name]: _, ...rest } = updatedFilter[type]; // Remove the unchecked item
        updatedFilter[type] = rest;
      } else {
        // If the checkbox is checked, add it to the filter
        updatedFilter[type] = {
          ...updatedFilter[type],
          [name]: checked,
        };
      }

      return updatedFilter;
    });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    setFilter((prevState) => ({
      ...prevState,
      price: newValue,
    }));
  };

  useEffect(() => {
    setCategoriesChecked(filter.categories || {});
    setBrandsChecked(filter.brands || {});
    setAvailabilityChecked(filter.availability || {});
    setPriceRange(filter.price || [0, 500]);
  }, [filter]);

  return (
    <Box className="sidebar">
      <Typography className="sectionTitle" variant="h6" align="left">
        Categories
      </Typography>
      <Box sx={{ display: "grid", marginBottom: "10px" }}>
        {categories.map((category) => (
          <FormControlLabel
            key={category.value}
            control={
              <Checkbox
                checked={categoriesChecked[category.value] || false}
                onChange={handleCheckboxChange(
                  setCategoriesChecked,
                  "categories"
                )}
                name={category.value}
              />
            }
            label={category.label}
          />
        ))}
      </Box>

      <Typography className="sectionTitle" variant="h6" align="left">
        Price
      </Typography>
      <Typography className="priceLabel" variant="body1">
        Price Range: ${priceRange[0]} - ${priceRange[1]}
      </Typography>
      <Slider
        className="slider"
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="on"
        min={0}
        max={500}
        valueLabelFormat={(value) => `$${value}`}
      />

      <Typography className="sectionTitle" variant="h6" align="left">
        Brands
      </Typography>
      <Box sx={{ display: "grid", marginBottom: "10px" }}>
        {brands.map((brand) => (
          <FormControlLabel
            key={brand.value}
            control={
              <Checkbox
                checked={brandsChecked[brand.value] || false}
                onChange={handleCheckboxChange(setBrandsChecked, "brands")}
                name={brand.value}
              />
            }
            label={brand.label}
          />
        ))}
      </Box>

      <Typography className="sectionTitle" variant="h6" align="left">
        Availability
      </Typography>
      <Box sx={{ display: "grid", marginBottom: "10px" }}>
        {availability.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={availabilityChecked[option.value] || false}
                onChange={handleCheckboxChange(
                  setAvailabilityChecked,
                  "availability"
                )}
                name={option.value}
              />
            }
            label={option.value === "inStock" ? "In Stock" : "Out of Stock"}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SidebarFilter;
