import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { UserProfileCollection } from "/imports/api/UserProfileCollection"; 
import './Profile.css';

export const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [company, setCompany] = useState("");
  const [photo, setPhoto] = useState("");

  const isLoading = useSubscribe("profile");
  const profile = useTracker(() => {
    const userProfile = UserProfileCollection.findOne({ _id: Meteor.userId() });
    return userProfile;
  });

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setDob(profile.dob || "");
      setGender(profile.gender || "");
      setCompany(profile.company || "");
      setPhoto(profile.photo || "");
    }
  }, [profile]);

  if (!Meteor.userId()) {
    alert("Você precisa estar logado para salvar o perfil.");
    return;
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhoto(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Por favor, selecione uma imagem válida.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = { name, email, dob, gender, company, photo };

    try {
      Meteor.call('userProfile.insert', profileData, (error, result) => {
        if (error) {
          console.error("Erro ao salvar perfil:", error);
          alert("Erro ao salvar perfil!");
        } else {
          alert("Perfil salvo com sucesso!");
        }
      });
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao salvar perfil!");
    }
  };

  if (isLoading()) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <CardContent>
          <Typography variant="h5" className="profile-title">
            Meu Perfil
          </Typography>
          <Typography variant="body2" className="profile-text">
            Atualize suas informações e mantenha seu perfil sempre atualizado.
          </Typography>

          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField 
              required 
              id="name" 
              label="Nome" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              fullWidth margin="normal" 
            />
            <TextField 
              required 
              id="email" 
              label="Email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              fullWidth margin="normal" 
            />
            <TextField 
              required 
              id="dob" 
              label="Data de Nascimento" 
              type="date" 
              InputLabelProps={{ shrink: true }} 
              value={dob} 
              onChange={(e) => setDob(e.target.value)} 
              fullWidth margin="normal" 
            />

            <FormControl fullWidth required margin="normal">
              <InputLabel id="gender-label">Sexo</InputLabel>
              <Select 
                labelId="gender-label" 
                id="gender" 
                value={gender} 
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="male">Masculino</MenuItem>
                <MenuItem value="female">Feminino</MenuItem>
              </Select>
            </FormControl>

            <TextField 
              required 
              id="company" 
              label="Empresa" 
              value={company} 
              onChange={(e) => setCompany(e.target.value)} 
              fullWidth margin="normal" 
            />

            <Box sx={{ mt: 2 }}>
              <input 
                accept="image/*" 
                style={{ display: "none" }} 
                id="photo-upload" 
                type="file" 
                onChange={handlePhotoChange} 
              />
              <label htmlFor="photo-upload">
                <Button variant="contained" component="span" sx={{ backgroundColor: "black" }}>
                  Escolher Imagem
                </Button>
              </label>
              {photo && <img src={photo} alt="Preview" className="photo-preview" />}
              <small className="photo-helper-text">Selecione uma imagem</small>
            </Box>

            <Box className="button-container">
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ backgroundColor: "black" }} 
                onClick={() => window.location.reload()}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                sx={{ backgroundColor: "black" }}
              >
                Salvar Perfil
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};
