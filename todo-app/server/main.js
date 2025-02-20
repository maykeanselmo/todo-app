import { Meteor } from 'meteor/meteor';



const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(async () => {
  const user = await Accounts.findUserByUsername(SEED_USERNAME);
  if (!user) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
