import { Meteor } from "meteor/meteor";
import { UserProfileCollection } from "./UserProfileCollection";

Meteor.publish("profile", async function () {

  return UserProfileCollection.find({});
});
