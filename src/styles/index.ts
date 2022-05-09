import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#db0000",
      main: "#db0000",
      dark: "#831010"
    },
    secondary: {
      light: "#564d4d",
      main: "#141414",
      dark: "#000000"
    },
    background: {
      default: "#141414",
      paper: "#000"
    },
    text: {
      primary: "#ffffff"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.9)",
          fontWeight: '600',
          padding: "4px 25px 4px 21px",
          textTransform: "none",
          fontSize: "1.05rem",
        }
      }
    },
  }
});

export default theme