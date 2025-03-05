import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export const StatusButton = () => {
  const [status, setStatus] = React.useState("cadastrada");

  const handleChange = (event, newStatus) => {
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };

  return (
    <ToggleButtonGroup
      value={status}
      exclusive
      onChange={handleChange}
      aria-label="Status"
    >
      <ToggleButton
        value="cadastrada"
        sx={{
          backgroundColor: status === "cadastrada" ? "#ff9800" : "transparent",
          color: status === "cadastrada" ? "#fff" : "#000",
          "&:hover": { backgroundColor: "#e68900", color: "#fff" }
        }}
      >
        Cadastrada
      </ToggleButton>

      <ToggleButton
        value="em-andamento"
        sx={{
          backgroundColor: status === "em-andamento" ? "#ffeb3b" : "transparent",
          color: status === "em-andamento" ? "#000" : "#000",
          "&:hover": { backgroundColor: "#d4c300", color: "#000" }
        }}
      >
        Em Andamento
      </ToggleButton>

      <ToggleButton
        value="concluida"
        sx={{
          backgroundColor: status === "concluida" ? "#388e3c" : "transparent",
          color: status === "concluida" ? "#fff" : "#000",
          "&:hover": { backgroundColor: "#388e3c", color: "#fff" }
        }}
      >
        Concluída
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
