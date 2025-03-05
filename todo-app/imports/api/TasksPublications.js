import { TasksCollection } from "./TasksCollection";

Meteor.publish("tasks", () => {
    return TasksCollection.find();
  });