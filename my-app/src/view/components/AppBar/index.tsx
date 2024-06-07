import { Button, Box, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export default function AppBarComponent() {
  return (
    <AppBar
      position="fixed"
      component="nav"
      sx={{
        backgroundColor: "black",
        zIndex: 1300,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            flexGrow: "1",
          }}
        >
          <Typography variant="h6">Home</Typography>
        </Box>
        <Button>Sing out</Button>
      </Toolbar>
    </AppBar>
  );
}
