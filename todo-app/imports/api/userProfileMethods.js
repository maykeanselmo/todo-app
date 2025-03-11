import { Meteor } from 'meteor/meteor';
import { UserProfileCollection } from '/imports/api/UserProfileCollection'; 

Meteor.methods({
  async 'userProfile.insert'(profileData) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Você precisa estar logado para fazer isso!');
    }

    if (!profileData.name || !profileData.email) {
      throw new Meteor.Error('invalid-data', 'Nome e email são obrigatórios.');
    }

    try {
      
      const profileId = await UserProfileCollection.insertAsync({
        ...profileData,
        _id: this.userId, 
        createdAt: new Date(), 
      });
    
      return profileId;
    } catch (error) {
      console.error("Erro ao inserir perfil:", error);
      throw new Meteor.Error('server-error', 'Erro interno do servidor ao salvar perfil.');
    }
  },
  async 'userProfile.get'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Você precisa estar logado para acessar o perfil.');
    }

    try {
      const profile = await UserProfileCollection.findOneAsync({ _id: this.userId });

      if (!profile) {
        throw new Meteor.Error('profile-not-found', 'Perfil não encontrado para o usuário.');
      }

      return profile;
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      throw new Meteor.Error('server-error', 'Erro interno do servidor ao buscar perfil.');
    }
  },

});