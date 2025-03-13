import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const TaskType = ({ handleChange, typeValue }) => {
 

  return (
    <FormControl required>
      <FormLabel id="demo-controlled-radio-buttons-group">Tipo de Tarefa</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={typeValue}
        onChange={handleChange}
      >
        <FormControlLabel value="public" control={<Radio />} label="Pública" />
        <FormControlLabel value="personal" control={<Radio />} label="Pessoal" />
      </RadioGroup>
    </FormControl>
  );
}
