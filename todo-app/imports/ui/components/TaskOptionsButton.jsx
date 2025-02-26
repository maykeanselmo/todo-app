import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Popover from '@mui/material/Popover';

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
  <Button key="one" style={{ backgroundColor: 'black', color: 'white' }}>Editar</Button>,
  <Button key="two" style={{ backgroundColor: 'black', color: 'white' }}>Deletar</Button>,
];

export const TaskOptionsButton = ({ anchorEl, handleClose }) => {
  const open = Boolean(anchorEl);
  return (
    <ThemeProvider theme={theme}>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            backgroundColor: 'black',
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
      </Popover>
    </ThemeProvider>
  );
}
