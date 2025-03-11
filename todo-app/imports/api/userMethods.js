import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'user.getById'(userId) {
    check(userId, String); ;
    try {
      const user =  Meteor.users.findOneAsync(userId);
      if (!user) {
        throw new Meteor.Error('user-not-found', 'User not found');
      }
      return user;
    } catch (error) {
      if (error.error === 'user-not-found') {
        throw new Meteor.Error('user-not-found', 'User not found');
      } else {
        console.error("Erro no método user.getById:", error.message);
        throw new Meteor.Error('internal-server-error', 'An internal server error occurred');
      }
    }
  }
});
