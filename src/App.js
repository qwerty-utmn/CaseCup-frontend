import React from 'react';
import {
  Grid, AppBar, Box, Typography, Toolbar,
} from '@material-ui/core';

import './App.css';

function App() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
          >
            <Grid item>
              <Typography variant="h6" ma>
                Title
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default App;
