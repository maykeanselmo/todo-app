import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { useNavigate } from 'react-router-dom';
import "./LoginForm.css"; 

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    if (isRecovering) {
      Meteor.forgotPassword({ email }, (error) => {
        if (error) {
          alert("Erro ao recuperar senha: " + error.reason);
        } else {
          alert("Email de recuperação enviado!");
        }
      });
      return;
    }

    if (isRegistering) {
      Accounts.createUser({ email, username, password }, (error) => {
        if (error) {
          alert("Erro ao criar conta: " + error.reason);
        } else {
          alert("Conta criada com sucesso! Faça login.");
          setIsRegistering(false);
        }
      });
    } else {
      Meteor.loginWithPassword(username, password, (error) => {
        if (error) {
          alert("Erro ao fazer login: " + error.reason);
        }
      });
      //localStorage.setItem('user', username);
      //navigate('/welcome');
    }
  };

  return (
    <div className="login-container">
      <div>
        <h2>Bem-vindo ao To-Do List</h2>
      </div>
      
      <form onSubmit={submit} className="login-form">
        {isRegistering && (
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <input
          type="text"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        {!isRecovering && (
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <button className="register-button" type="submit">
          {isRecovering ? "Recuperar Senha" : isRegistering ? "Cadastrar" : "Entrar"}
        </button>
      </form>

      {!isRecovering && (
        <div>
          <button className="link-button" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Já tem uma conta? Entrar" : "Cadastrar"}
          </button>
          <button className="link-button" onClick={() => setIsRecovering(true)}>
            Recuperar senha
          </button>
        </div>
      )}
      
      {isRecovering && (
        <button className="link-button" onClick={() => setIsRecovering(false)}>
          Voltar ao login
        </button>
      )}
    </div>
  );
};