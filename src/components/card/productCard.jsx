import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const ProductCard = (props) => {
  return (
    <Box>
      <Card
        elevation={0}
        sx={{
          maxWidth: 345,
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={props.product.image || "https://via.placeholder.com/140"}
          alt={props.product.name}
          sx={{
            objectFit: "contain",
            width: "100%",
          }}
        />

        <CardContent sx={{ textAlign: "left" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {props.product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: "5px" }}
          >
            {props.product.category}
          </Typography>

          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              ${props.product.price}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductCard;
