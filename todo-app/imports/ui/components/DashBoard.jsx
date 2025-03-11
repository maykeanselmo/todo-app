import React from "react";
import { DashBoardCard } from "./DashBoardCard";
import { TasksCollection } from "../../api/TasksCollection";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useNavigate } from 'react-router-dom';

export const DashBoard = () => {
  const isLoading = useSubscribe("tasks");
   const navigate = useNavigate();

  const tasksCompleted = useTracker(() => {
    return TasksCollection.find({ status: "CONCLUÍDO" }).count();
  });

  const tasksRegistered = useTracker(() => {
    return TasksCollection.find({ status: "CADASTRADO" }).count();
  });

  const tasksInProgress = useTracker(() => {
    return TasksCollection.find({ status: "ANDAMENTO" }).count();
  });

  const goToTaskPage = () => {
        navigate ("/tasks");
  }

  if (isLoading()) {
    return <p>Carregando...</p>;
  }

  const completed = { title: "Tarefas Concluídas", value: tasksCompleted };
  const registered = { title: "Tarefas Cadastradas", value: tasksRegistered };
  const inProgress = { title: "Tarefas em Andamento", value: tasksInProgress };
  const taskView = { title: "Visualizar Tarefas", value: "Clique para ver" };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <DashBoardCard data={registered} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DashBoardCard data={inProgress} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DashBoardCard data={completed} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DashBoardCard data={taskView} onClick={goToTaskPage} sx={{ cursor: "pointer"}} />
        </Grid>
      </Grid>
    </Container>
  );
};
