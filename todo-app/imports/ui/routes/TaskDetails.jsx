import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useParams } from "react-router-dom";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Button, Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import { format } from "date-fns";
import { UpdateForm } from "../components/UpdateForm";
import { TaskStatus } from "../components/TaskStatus";
import { TemporaryDrawer } from "../components/TemporaryDrawer";
import "./TaskDetails.css";

export const TaskDetails = () => {
  const { taskId } = useParams();
  const user = useTracker(() => Meteor.user());
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [userTask, setUserTask] = useState(null);

  const isLoading = useSubscribe("tasks");

  const task = useTracker(() => {
    console.log("Consultando tarefa com _id:", taskId);
    return TasksCollection.findOne({ _id: taskId });
  }, [taskId]);

  useEffect(() => {
    if (task && task.createByUser) {
      console.log("ID do usuário para buscar:", task.createByUser);
      Meteor.call("user.getById", task.createByUser, (error, result) => {
        if (error) {
          if (error.error === 'user-not-found') {
            console.error("Usuário não encontrado:", error.reason);
          } else {
            console.error("Erro interno do servidor ao buscar usuário:", error.reason);
          }
        } else {
          console.log("Usuário encontrado:", result);
          setUserTask(result);
        }
      });
    }
  }, [task]);

  const toggleUpdateFormVisibility = () => {
    setUpdateFormVisible(!isUpdateFormVisible);
  };

  if (isLoading()) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  if (!task) {
    console.log("Tarefa não encontrada:", taskId);
    return <div>Tarefa não encontrada</div>;
  }

  if (!userTask) {
    return <p>Carregando usuário...</p>;
  }

  const formattedDate = format(new Date(task.date), "dd/MM/yyyy 'às' HH:mm");

  return (
    <>
      <div>
        <TemporaryDrawer/> 
      </div>
      <Box sx={{ padding: 4 }}>
        <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: "hidden" }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: "#333" }}>
              Detalhes da Tarefa
            </Typography>

            <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 500, color: "#444" }}>
              {task.name}
            </Typography>

            <Typography variant="body1" color="textSecondary" paragraph>
              <strong>Descrição:</strong> {task.description}
            </Typography>

            <Typography variant="body1" color="textSecondary" paragraph>
              <strong>Status:</strong> {task.status}
            </Typography>

            <Typography variant="body1" color="textSecondary" paragraph>
              <strong>Data:</strong> {formattedDate}
            </Typography>

            {task.createByUser && (
              <Typography variant="body1" color="textSecondary" paragraph>
                <strong>Criado por:</strong> {userTask?.username || 'Usuário desconhecido'}
              </Typography>
            )}

            <div className="statusButton">
              <TaskStatus task={task._id} />
            </div>

            <Box sx={{ marginTop: 3, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: 'black', color: 'white' }}
                sx={{
                  borderRadius: 3,
                  padding: "8px 16px",
                  fontWeight: 500,
                  textTransform: "none",
                  boxShadow: 2,
                }}
                onClick={toggleUpdateFormVisibility}
              >
                Editar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {isUpdateFormVisible && <UpdateForm taskId={taskId} setShowForm={setUpdateFormVisible} />}
    </>
  );
};

export default TaskDetails;
