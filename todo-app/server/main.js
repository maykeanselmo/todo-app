import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/TasksCollection';
import "../imports/api/TasksPublications"; 
import "../imports/api/tasksMethods"; 


const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

const insertTask = (taskText, time) =>
  TasksCollection.insertAsync({ 
    text: taskText,
    time: time
  });

Meteor.startup(async () => {
  const user = await Accounts.findUserByUsername(SEED_USERNAME);
  if (!user) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  if ((await TasksCollection.find().countAsync()) === 0) {
    const mockTasks = [
      { text: "Comprar leite", time: new Date() },
      { text: "Estudar React", time: new Date() },
      { text: "Fazer exercícios", time: new Date() }
    ];

    for (const task of mockTasks) {
      await insertTask(task.text, task.time);
    }
  }
});
