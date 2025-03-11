# 📝 To Do List   

Este projeto é uma aplicação de lista de tarefas (To-Do List) desenvolvida com Meteor, React e Material-UI. A aplicação permite que usuários gerenciem suas tarefas de forma segura, garantindo que apenas o criador da tarefa possa editá-la ou removê-la.  

---

## 🛠️ Tecnologias Utilizadas  

- **[Meteor](https://www.meteor.com/)** - Framework full-stack para desenvolvimento web.  
- **[React](https://react.dev/)** - Biblioteca para construção da interface.  
- **[React Router](https://reactrouter.com/)** - Gerenciamento de rotas.  
- **[Material-UI](https://mui.com/)** - Biblioteca de componentes visuais.  
- **[MongoDB](https://www.mongodb.com/)** - Banco de dados NoSQL.  

---

## 📌 Funcionalidades  

### 🔐 Autenticação  
- Implementação de login e senha usando o pacote de **Accounts do Meteor**.  
- A aplicação só pode ser acessada por usuários logados.  

### 🌐 Navegação  
- Uso do **React Router** para gerenciamento de rotas.  
- Páginas implementadas:
  - Tela de **Login/Cadastro**
  - Tela de **Boas-vindas** (Dashboard)  
  - Tela de **Lista de Tarefas**  
  - Tela de **Visualização/Edição de Tarefa**  
  - Tela de **Perfil do Usuário**  

### ✅ Gerenciamento de Tarefas  
- Implementação de um **To-Do List** utilizando **Material-UI**:  
  - Listagem de tarefas com **ícone, nome e nome do usuário criador**.  
  - Botão para **remover** e **editar** tarefas.  
  - Edição das tarefas em uma nova tela com os seguintes campos:  
    - Nome  
    - Descrição  
    - Situação (Cadastrada, Em Andamento, Concluída)  
    - Data de criação  
    - Usuário que criou a tarefa  
  - Regras de transição de status:  
    - Cadastrada → Em Andamento  
    - Em Andamento → Concluída  
    - Concluída → Cadastrada  

### 🔒 Permissões  
- Apenas o **criador** pode editar ou excluir a tarefa.  
- Todos os usuários podem visualizar as tarefas **não pessoais**.  
- Se a tarefa for **pessoal**, apenas o criador pode vê-la (controle via publicação do Meteor).  

### 👤 Perfil do Usuário  
- Cada usuário pode visualizar e editar seu perfil.  
- Campos do perfil:  
  - Nome  
  - Email  
  - Data de nascimento  
  - Sexo (Select)  
  - Empresa  
  - Foto (salva no banco de dados em **base64**)  

### 📌 Drawer (Menu Lateral)  
- Implementação de um **Drawer** utilizando Material-UI contendo:  
  - Foto, Nome e Email do usuário logado  
  - Link para a lista de tarefas  
  - Link para os dados do usuário  

### 📊 Dashboard  
- Tela de boas-vindas apresenta um **Dashboard** com informações:  
  - Total de Tarefas **Cadastradas**  
  - Total de Tarefas **Em Andamento**  
  - Total de Tarefas **Concluídas**  
  - Ação para acessar a lista completa de tarefas  

---

## 🚀 Como Executar o Projeto  

### 1️⃣ Instalar Dependências  
Certifique-se de ter o **Meteor** instalado em sua máquina. Caso não tenha, instale em:  

https://docs.meteor.com/about/install.html

Clone o repositório e instale as dependências:
```sh
git clone https://github.com/maykeanselmo/todo-app.git
cd todo-meteor
meteor npm install
```
Iniciar o Servidor
```sh
meteor run
```

## 📌 Pacotes Utilizados
### 📦 Meteor
```sh
meteor add accounts-password 
meteor add alanning:roles 
```
### 📦 React e React Router
```sh
meteor npm install react react-dom
meteor npm install react-router-dom
```
### 📦 Material-UI
```sh
meteor npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```
### 📦 Outras Dependências
```sh
meteor npm install moment 
meteor npm install bcrypt 
```
