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
        userId: this.userId, 
        createdAt: new Date(), 
      });

      console.log('Perfil inserido com sucesso. ID:', profileId);
      return profileId;
    } catch (error) {
      console.error("Erro ao inserir perfil:", error); // Log detalhado do erro
      throw new Meteor.Error('server-error', 'Erro interno do servidor ao salvar perfil.');
    }
  },
});
