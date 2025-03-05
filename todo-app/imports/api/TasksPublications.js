import { TasksCollection } from "./TasksCollection";
import { Meteor } from "meteor/meteor";

Meteor.publish("tasks", async function () {
  console.log("cheguei no publisher");

  if (!this.userId) {
    return [];
  }

  const currentUser = await Meteor.users.findOneAsync(this.userId);
  const currentUsername = currentUser ? currentUser.username : '';

  return TasksCollection.find({
    $or: [
      { typeTask: 'public' },
    
      { typeTask: 'personal', createBy: currentUsername }
    ]
  });
});
