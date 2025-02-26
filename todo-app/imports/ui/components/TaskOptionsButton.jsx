import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButtonGroup: {
      styleOverrides: {
        grouped: {
          borderColor: 'white',
        },
      },
    },
  },
});

const buttons = [
  <Button key="one" style={{ backgroundColor: '#2f2f2f', color: 'white' }}>Editar</Button>,
  <Button key="two" style={{ backgroundColor: '#2f2f2f', color: 'white' }}>Deletar</Button>,
];

export const TaskOptionsButton = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          '& > *': {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="Vertical button group"
          variant="contained"
        >
          {buttons}
        </ButtonGroup>
      </Box>
    </ThemeProvider>
  );
}
