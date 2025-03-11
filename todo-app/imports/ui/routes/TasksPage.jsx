import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { TaskList } from '../components/TaskList';
import { TaskForm } from "../components/TaskForm.jsx";
import { AddTaskButton } from "../components/AddTaskButton.jsx";
import { TemporaryDrawer } from "../components/TemporaryDrawer.jsx";
import { LoginRequired } from "../components/LoginRequired.jsx";
import "./TasksPage.css";

export const TasksPage = () => {
    const user = useTracker(() => Meteor.user());
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(prevState => !prevState);
    };

    return user ? (
        <>
            <TemporaryDrawer />
            <div className="tasks-page">
                <h1 className="tasks-title">📌 Minhas Tarefas</h1>
                <TaskList />
                <AddTaskButton onClick={toggleFormVisibility} />
                {isFormVisible && <TaskForm />}
            </div>
        </>
    ) : (
        <LoginRequired />
    );
};
