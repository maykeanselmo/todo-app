import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const DashBoardCard = ({ data, onClick}) => {
  return (
    <Box sx={{ minWidth: 275, m: 1 }}>
      <Card
        variant="outlined"
        sx={{
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#FAFAF1",
          transition: "0.3s",
          "&:hover": {
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardActionArea
          onClick={onClick}
          sx={{
            height: "100%",
            p: 2,
            "&:hover": {
              backgroundColor: "action.selected",
            },
          }}
        >
          <CardContent>
            <Typography
              sx={{ color: "gray", fontSize: 14, fontWeight: 500 }}
              gutterBottom
            >
              {data.title}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {data.value}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
