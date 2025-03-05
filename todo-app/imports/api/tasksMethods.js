import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
  "tasks.insert"(doc) {
    return TasksCollection.insertAsync(doc);
  },
  "tasks.delete"(_id){
    return TasksCollection.removeAsync(_id);
  },
  "tasks.update"(taskId, taskUpdated){
    if (!this.userId) {
      throw new Meteor.Error("Não autorizado", "Você precisa estar logado para atualizar uma tarefa.");
    }
    return TasksCollection.updateAsync(
      { _id: taskId },
      {
        $set: {
          name: taskUpdated.name,
          description: taskUpdated.description,
          date: taskUpdated.date,
          updatedAt: new Date(),
        },
      }
    );
  },
  "tasks.setStatus"(taskId, status){
    if (!this.userId) {
      throw new Meteor.Error("Não autorizado", "Você precisa estar logado para atualizar uma tarefa.");
    }
    return TasksCollection.updateAsync(
      { _id: taskId },
      {
        $set: {
          status: status
        },
      }
    );
  },
  
  'tasks.getTask'(taskId) {
    if (!taskId) {
      throw new Meteor.Error('invalid-arguments', 'Task ID não fornecido');
    }

    const task = TasksCollection.findOneAsync(taskId);

    if (!task) {
      throw new Meteor.Error('task-not-found', 'Tarefa não encontrada');
    }

    return task;
  }

});