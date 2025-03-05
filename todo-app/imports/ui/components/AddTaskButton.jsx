import React, { useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export const AddTaskButton = ({ onClick }) => (
  <Fab
    color="black"
    aria-label="add"
    onClick={onClick}
    style={{
      position: 'fixed',
      bottom: '16px',
      right: '16px',
    }}
  >
    <AddIcon />
  </Fab>
);
