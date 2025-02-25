import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker, useSubscribe} from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { TaskList} from '../components/TaskList';
import { TaskForm } from "../components/TaskForm.jsx";
import { TasksCollection } from "../../api/TasksCollection"; 


export const TasksPage = () =>{

    const isLoading = useSubscribe("tasks");  
    const user = useTracker(() => Meteor.user());
    const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
    const navigate = useNavigate();
    const login = () =>{
        navigate('/');

    }

    
    if (isLoading()){
        return <div> Loading... </div>
    }

    return (

        <div>
            
            {user ? (
                      <>
                        <div>
                          <TaskList tasks={tasks} />
                        </div> 
                        <div><TaskForm/></div>
                      </>
                )
                : (
                    <div>
                        <h1>Faça login!</h1> 
                        <button onClick={login}>Fazer login</button>
                    </div>
                )
            }
             
           </div>
    )
}


  