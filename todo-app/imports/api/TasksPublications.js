import { TasksCollection } from "./TasksCollection";
import { Meteor } from "meteor/meteor";

Meteor.publish("tasks", async function () {

  if (!this.userId) {
    return [];
  }

  return TasksCollection.find({
    $or: [
      { typeTask: 'public' },
    
      { typeTask: 'personal', createByUser: this.userId }
    ]
  });
});
