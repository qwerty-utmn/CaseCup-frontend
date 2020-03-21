import React from 'react';
import { Box } from '@material-ui/core';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;
  return (
    <Box
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
      <Box paddingTop={2}>
        {' '}
        {children}
      </Box>
      )}
    </Box>
  );
}

export default TabPanel;
