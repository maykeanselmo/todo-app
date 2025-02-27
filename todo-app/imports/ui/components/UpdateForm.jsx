import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { TasksCollection } from "../../api/TasksCollection"; 

export const UpdateForm = ({ taskId, setShowForm }) => {
  const [task, setTask] = useState({ name: "", description: "", date: "" });


  useEffect(() => {
    if (taskId) {
      
      const currentTask = TasksCollection.findOne(taskId);
      if (currentTask) {
        setTask({
          name: currentTask.name,
          description: currentTask.description,
          date: currentTask.date,
        });
      }
    }
  }, [taskId]); 

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 
    await Meteor.callAsync("tasks.update", taskId, {
        name: task.name,
        description: task.description,
        date: task.date,
        updatedAt: new Date(),
    });

    
    setTask({
      name: "",
      description: "",
      date: "",
    });

    setShowForm(false);
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
        Editar Tarefa
      </Typography>
      <TextField
        label="Nome"
        name="name"
        variant="outlined"
        fullWidth
        value={task.name}
        onChange={handleChange}
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
        Editar Tarefa
      </Button>
    </Box>
  );
};
