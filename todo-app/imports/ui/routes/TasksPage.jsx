import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';


const tasks = [
    {
      id: 1,
      title: "Finalizar documentação do projeto",
      description: "Escrever a documentação da API e revisar requisitos.",
      status: "pendente",
      priority: "alta",
      dueDate: "2025-02-25",
    },
    {
      id: 2,
      title: "Implementar autenticação",
      description: "Adicionar login com Meteor e proteger rotas.",
      status: "em andamento",
      priority: "média",
      dueDate: "2025-02-22",
    },
    {
      id: 3,
      title: "Criar interface de usuário",
      description: "Desenvolver a tela de listagem de tarefas.",
      status: "pendente",
      priority: "alta",
      dueDate: "2025-02-28",
    },
    {
      id: 4,
      title: "Refatorar código backend",
      description: "Melhorar a estrutura do código no servidor.",
      status: "concluído",
      priority: "baixa",
      dueDate: "2025-02-20",
    },
    {
      id: 5,
      title: "Testar funcionalidades",
      description: "Escrever testes unitários e de integração.",
      status: "em andamento",
      priority: "alta",
      dueDate: "2025-03-01",
    },
  ];


export const TasksPage = () =>{

    const user = useTracker(() => Meteor.user());
    const navigate = useNavigate();
    const login = () =>{
        navigate('/');
    } 

    return (

        <div>
            {user ? (
                    <div>
                        <ol>
                            {tasks.map((item) => <li>{item.title}</li>)}
                        </ol>
                    </div>
                )
                : (
                    <div>
                        <h1>Faça login!</h1>
                        <button onClick={login}>Fazer login</button>
                    </div>
                )
            }
             
           </div>
    )
}


  