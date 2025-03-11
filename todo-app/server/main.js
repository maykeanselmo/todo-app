import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/TasksCollection';
import { UserProfileCollection } from '../imports/api/UserProfileCollection';
import "../imports/api/TasksPublications"; 
import "../imports/api/tasksMethods"; 
import "../imports/api/UserProfilePublications"; 
import "../imports/api/userMethods"; 
import "../imports/api/userProfileMethods"; 

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

const insertTask = (taskText, time) =>
  TasksCollection.insertAsync({ 
    name: taskText,
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
      { name: "Comprar leite", time: new Date() },
      { name: "Estudar React", time: new Date() },
      { name: "Fazer exercícios", time: new Date() }
    ];

    for (const task of mockTasks) {
      await insertTask(task.name, task.time);
    }
  }

  if ((await UserProfileCollection.find().countAsync()) === 0) {
    const mockProfiles = [
      { 
        nome: "João Silva", 
        email: "joao.silva@example.com", 
        dataNascimento: new Date("1990-01-01"), 
        sexo: "Masculino", 
        empresa: "Tech Corp", 
        foto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..." 
      },
      { 
        nome: "Maria Oliveira", 
        email: "maria.oliveira@example.com", 
        dataNascimento: new Date("1985-03-15"), 
        sexo: "Feminino", 
        empresa: "Inova Ltda", 
        foto: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..." 
      }
      
    ];

    for (const profile of mockProfiles) {
      await UserProfileCollection.insertAsync(profile); 
    }

    console.log("Dados mock inseridos na coleção userProfile.");
  }
});
