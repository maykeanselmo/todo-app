import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { TaskList } from '../components/TaskList';
import { TaskForm } from "../components/TaskForm.jsx";
import "./TasksPage.css"; 
import { AddTaskButton } from "../components/AddTaskButton.jsx";

export const TasksPage = () => {
    const user = useTracker(() => Meteor.user());
   
    const [isFormVisible, setFormVisible] = useState(false);
    const navigate = useNavigate();

    const login = () => {
        navigate('/');
    }

    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
    }

    return user ? (
        <>
            <div className="tasks-page">
                <h1 className="tasks-title">📌 Minhas Tarefas</h1>
                
                <TaskList />
                <AddTaskButton onClick={toggleFormVisibility} />
                {isFormVisible && <TaskForm />}
            </div>
        </>
    ) : (
        <div>
            <h1>Faça login!</h1>
            <button onClick={login}>Fazer login</button>
        </div>
    );
}
