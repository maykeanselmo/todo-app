import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export const TaskStatus = () => {
  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button
        sx={{
          backgroundColor: "#bdbdbd", // Cinza
          color: "#fff",
          "&:hover": { backgroundColor: "#9e9e9e" }
        }}
      >
        Cadastrado
      </Button>

      <Button
        sx={{
          backgroundColor: "#64b5f6", // Azul claro
          color: "#fff",
          "&:hover": { backgroundColor: "#42a5f5" }
        }}
      >
        Andamento
      </Button>

      <Button
        sx={{
          backgroundColor: "#66bb6a", // Verde claro
          color: "#fff",
          "&:hover": { backgroundColor: "#388e3c" }
        }}
      >
        Concluído
      </Button>
    </ButtonGroup>
  );
}
// cores antigas
/*
 <Button
        sx={{
          backgroundColor: "#D3D3D3", // Cinza
          color: "#fff",
          "&:hover": { backgroundColor: "#B3B3B3" }
        }}
      >
        Cadastrado
      </Button>

      <Button
        sx={{
          backgroundColor: "#A9A9A9", // Azul claro
          color: "#fff",
          "&:hover": { backgroundColor: "#8C8C8C" }
        }}
      >
        Andamento
      </Button>

      <Button
        sx={{
          backgroundColor: "#000000", // Verde claro
          color: "#fff",
          "&:hover": { backgroundColor: "#1C1C1C" }
        }}
      >
        Concluído
      </Button>


*/
