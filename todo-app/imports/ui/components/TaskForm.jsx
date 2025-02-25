import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import "./TaskForm.css";  

export const TaskForm = ({  }) => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    date: "",
  });



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
    <form className="task-form" onSubmit={handleSubmit}>
      <Typography variant="h6" className="task-title">Editar tarefa</Typography>

      <TextField
        label="Nome"
        name="name"
        variant="filled"
        fullWidth
        value={task.name}
        onChange={handleChange}
        required
        className="task-input"
      />

      <TextField
        label="Descrição"
        name="description"
        variant="filled"
        multiline
        rows={3}
        fullWidth
        value={task.description}
        onChange={handleChange}
        required
        className="task-input"
      />

      <TextField
        label="Data"
        name="date"
        type="datetime-local"
        variant="filled"
        fullWidth
        value={task.date}
        onChange={handleChange}
        required
        InputLabelProps={{ shrink: true }}
        className="task-input"
      />

      <div className="task-buttons">
        <Button variant="contained" color="secondary" onClick={onCancel} className="task-button cancel">
          Cancelar
        </Button>
        <Button variant="contained" color="primary" type="submit" className="task-button save">
          Salvar
        </Button>
      </div>
    </form>
  );
};
