import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SecurityIcon from "@mui/icons-material/Security";
import Container from "@mui/material/Container";

function ResponsiveAppBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "center", // Centers all items inside the toolbar
            textAlign: "center",
          }}
        >
          <SecurityIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Be Vietnam Pro, sans-serif",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Malicious Code Scanner
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
