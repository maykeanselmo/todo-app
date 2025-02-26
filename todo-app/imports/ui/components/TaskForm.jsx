import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

export const TaskForm = () => {
  const [task, setTask] = useState({ name: "", description: "", date: "" });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.name || !task.description || !task.date) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    await Meteor.callAsync("tasks.insert", {
      name: task.name,
      description: task.description,
      date: task.date,
      createdAt: new Date(),
    });

    setTask({
      name: "",
      description: "",
      date: "",
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 2,
        boxShadow: 5,
        padding: 3,
        width: "80%",
        maxWidth: 400,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Nova Tarefa
      </Typography>
      <TextField
        label="Nome"
        name="name"
        variant="outlined"
        fullWidth
        value={task.name}
        onChange={handleChange}
        required
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "black" },
            "&:hover fieldset": { borderColor: "black" },
            "&.Mui-focused fieldset": { borderColor: "black" },
          },
        }}
      />
      <TextField
        label="Descrição"
        name="description"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        value={task.description}
        onChange={handleChange}
        required
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "black" },
            "&:hover fieldset": { borderColor: "black" },
            "&.Mui-focused fieldset": { borderColor: "black" },
          },
        }}
      />
      <TextField
        label="Data"
        name="date"
        type="datetime-local"
        variant="outlined"
        fullWidth
        value={task.date}
        onChange={handleChange}
        required
        InputLabelProps={{ shrink: true }}
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "black" },
            "&:hover fieldset": { borderColor: "black" },
            "&.Mui-focused fieldset": { borderColor: "black" },
          },
        }}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": { backgroundColor: "#333" },
        }}
        type="submit"
      >
        Adicionar Tarefa
      </Button>
    </Box>
  );
};
