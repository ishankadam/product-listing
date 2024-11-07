import React, { useEffect, useState } from "react";
import SidebarFilter from "../../components/sidebar/sidebar";
import ProductCard from "../../components/card/productCard";
import { Typography, Box } from "@mui/material";
import { brands, categories, types } from "../../commom";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({
    categories: {},
    brands: {},
    price: [0, 500],
    availability: {},
    type: "",
  });

  // Fetching products (only run once)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        data.forEach((item) => {
          // Assign random category, brand, availability, and type
          item.category =
            categories[Math.floor(Math.random() * categories.length)].value;
          item.brand = brands[Math.floor(Math.random() * brands.length)].value;
          item.inStock = Math.random() < 0.5; // Random inStock
          item.type = types[Math.floor(Math.random() * types.length)].value;
        });
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products to all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty array ensures this runs only once when the component mounts

  // Filtering products based on filter state
  useEffect(() => {
    const applyFilters = () => {
      // Check if all filter fields are empty or in their default state
      const isFilterEmpty =
        Object.keys(filter.categories).length === 0 &&
        Object.keys(filter.brands).length === 0 &&
        filter.price[0] === 0 &&
        filter.price[1] === 500 &&
        Object.keys(filter.availability).length === 0 &&
        filter.type === "";
      // If no filters are applied, show all products
      if (isFilterEmpty) {
        setFilteredProducts(products);
      } else {
        // Otherwise, filter products based on the filter state
        const filtered = products.filter((product) => {
          const matchesCategory =
            Object.keys(filter.categories).length === 0 ||
            Object.keys(filter.categories).some(
              (category) =>
                filter.categories[category] && category === product.category
            );
          const matchesBrand =
            Object.keys(filter.brands).length === 0 ||
            Object.keys(filter.brands).some(
              (brand) => filter.brands[brand] && brand === product.brand
            );
          const matchesPrice =
            product.price >= filter.price[0] &&
            product.price <= filter.price[1];
          const matchesAvailability =
            Object.keys(filter.availability).length === 0 ||
            filter.availability[product.inStock ? "inStock" : "outOfStock"];
          const matchesType = !filter.type || product.type === filter.type;

          return (
            matchesCategory &&
            matchesBrand &&
            matchesPrice &&
            matchesAvailability &&
            matchesType
          );
        });

        setFilteredProducts(filtered);
      }
    };

    applyFilters();
    console.log(filter);
  }, [filter, products]); // This only runs when 'filter' or 'products' changes

  return (
    <Box className="main-container" sx={{ padding: "3%" }}>
      <SidebarFilter filter={filter} setFilter={setFilter} />
      <div className="product-container">
        <Box
          sx={{
            marginTop: "30px",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>
            Showing{" "}
            <span style={{ color: "#9c703d" }}>{filteredProducts.length}</span>{" "}
            of <span style={{ color: "#9c703d" }}>{products.length}</span>{" "}
            Products
          </Typography>
        </Box>
        <div className="product-wrapper">
          {filteredProducts.length > 0 &&
            filteredProducts.map((product) => {
              return <ProductCard product={product} key={product.id} />;
            })}
        </div>
      </div>
    </Box>
  );
};

export default ProductListing;
