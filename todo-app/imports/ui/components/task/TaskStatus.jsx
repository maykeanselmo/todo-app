import * as React from "react";
import { Meteor } from "meteor/meteor";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../../../api/TasksCollection";

export const TaskStatus = ({task}) => {
  
const isInRegistered =  'CADASTRADO';
const isInProgress =  'ANDAMENTO';
const isCompleted =  'CONCLUÍDO';

const taskReturned = useTracker(() => {
    return TasksCollection.findOne({ _id: task });
  });

const setStatus = (status) => {
    if(taskReturned.status === isInRegistered && status === isCompleted){
      return;
    }
    else{
      Meteor.callAsync("tasks.setStatus", task, status)
    }
  }

  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button
        onClick={ () => setStatus(isInRegistered)}
        sx={{
          backgroundColor: "#bdbdbd",
          color: "#fff",
          "&:hover": { backgroundColor: "#9e9e9e" }
        }}
      >
        Cadastrado
      </Button>

      <Button
      onClick={ () => setStatus(isInProgress)}
        sx={{
          backgroundColor: "#64b5f6", 
          color: "#fff",
          "&:hover": { backgroundColor: "#42a5f5" }
        }}
        
      >
        Andamento
      </Button>

      <Button
      onClick={ () => setStatus(isCompleted)}
        sx={{
          backgroundColor: "#66bb6a", 
          color: "#fff",
          "&:hover": { backgroundColor: "#388e3c" }
        }}
      >
        Concluído
      </Button>
    </ButtonGroup>
  );
}