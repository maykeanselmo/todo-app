import React, { useState } from "react";
import { Meteor } from 'meteor/meteor';
import { TextField, Button, Typography, Box } from "@mui/material";
import { useTracker } from 'meteor/react-meteor-data';
import { TaskType } from "./TaskType";

export const TaskForm = () => {
  const [task, setTask] = useState({ name: "", description: "", date: ""});
  const user = useTracker(() => Meteor.user());
  const [typeTask, setTypeTask] = useState('public'); 


  const handleTypeTask = (event) => {
    setTypeTask(event.target.value);
  };

  const handleChangeTask = (e) => {
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
      status: "CADASTRADO",
      createdAt: new Date(),
      createBy: Meteor.user().username,
      typeTask: typeTask
    });

    setTask({
      name: "",
      description: "",
      date: "",
    });

    setTypeTask('public');
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
        onChange={ handleChangeTask}
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
        onChange={ handleChangeTask}
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
        onChange={ handleChangeTask}
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
      <TaskType handleChange = { handleTypeTask }  typeValue = {typeTask}/>
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
