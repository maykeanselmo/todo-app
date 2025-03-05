import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useParams } from "react-router-dom";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import { Button, Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import { format } from "date-fns"; 
import { UpdateForm } from "../components/UpdateForm";
import { TaskStatus } from "../components/TaskStatus";
import "./TaskDetails.css"; 


export const TaskDetails = () => {
  const user = useTracker(() => Meteor.user());
const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  const { taskId } = useParams(); 
  console.log("taskId capturado da URL:", taskId);

  
  
    const toggleUpdateFormVisibility = (taskId) => { 
      setUpdateFormVisible(!isUpdateFormVisible); 
    };

  if (typeof taskId !== "string") {
    console.log("taskId não é uma string válida:", taskId);
    return <div>Task not found - taskId inválido</div>;
  }


  const isLoading = useSubscribe("tasks");

  const task = useTracker(() => {
    console.log("Consultando tarefa com _id:", taskId);  
    return TasksCollection.findOne({ _id: taskId });
  });

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

  const formattedDate = format(new Date(task.date), "dd/MM/yyyy 'às' HH:mm");
  console.log("CONTA ATUAL: " , Meteor.user().username);
  return (
    <>
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

          {task.createBy && (
            <Typography variant="body1" color="textSecondary" paragraph>
              <strong>Criado por:</strong>  {task.createBy}
            </Typography>
          )}
            <div className="statusButton">
                <TaskStatus task={task._id}/>
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
              onClick={() => toggleUpdateFormVisibility(taskId)}
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
