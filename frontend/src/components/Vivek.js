import React, { useEffect, useState } from "react";
import { Button, Grid, Rating } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import "./Vivek.css";
import { faker } from "@faker-js/faker";

const Vivek = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [wishlist, setWishlist] = useState([]);

  const generateProducts = () => {
    const newProducts = Array.from({ length: 30 }, () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      rating: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
      no_rating: faker.helpers.rangeToNumber({ min: 1, max: 1000 }),
      image: faker.image.urlLoremFlickr({ category: "fashion" }),
      isWished: false,
    }));
    setProducts(newProducts);
  };

  useEffect(() => {
    generateProducts()
  },[]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleWishlistToggle = (id) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = [...prevWishlist];
      const productIndex = updatedWishlist.findIndex((item) => item === id);
      if (productIndex !== -1) {
        updatedWishlist.splice(productIndex, 1);
      } else {
        updatedWishlist.push(id);
      }
      return updatedWishlist;
    });
  };

  return (
    <div className="root">
      <div class="group">
  <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
  <input placeholder="Search" type="search" class="input" value={filter}
        onChange={handleFilterChange}></input>
</div>
      <Grid container spacing={2}>
        {products
          .filter((product) =>
            product.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <div className="product-container">
                <div className="image-container">
                  <img className="product-image" src={product.image} alt={product.name} />
                  <button
                    className="wishlist-button"
                    style={{ color: wishlist.includes(product.id) ? "red" : "black" }}
                    onClick={() => handleWishlistToggle(product.id)}
                  >
                    {wishlist.includes(product.id) ? (
                      <Favorite />
                    ) : (
                      <FavoriteBorder style={{color:"white"}}/>
                    )}
                  </button>
                  <Button className="view-product-button" variant="contained">View Product</Button>

                </div>
                <div className="product-card">
                  <h2>{product.name}</h2>
                  <p>Price: {product.price}</p>
                  <Rating name="product-rating" value={product.rating} readOnly />
                  <p>{("("+product.no_rating+")")}</p>
                </div>
              </div>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Vivek;
