import * as React from 'react'; 
import { Meteor } from 'meteor/meteor';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { TasksCollection } from '../../api/TasksCollection';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { ThreePonitIcon } from './ThreePointIcon';
import { TaskOptionsButton } from './TaskOptionsButton';
import { UpdateForm } from './UpdateForm';
import Typography from '@mui/material/Typography'; 


export const TaskList = () => {
  const isLoading = useSubscribe("tasks");
  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
  const [checked, setChecked] = React.useState([]);
  const [menuState, setMenuState] = React.useState({ anchorEl: null, selectedTaskId: null });
  const [isUpdateFormVisible, setUpdateFormVisible] = React.useState(false);
  const [selectedTaskId, setSelectedTaskId] = React.useState(null); 
  const user = useTracker(() => Meteor.user());

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleMenuOpen = (event, taskId) => {
    setMenuState({ anchorEl: event.currentTarget, selectedTaskId: taskId });
  };

  const handleMenuClose = () => {
    setMenuState({ anchorEl: null, selectedTaskId: null });
  };

  const handleDelete = async (_id) => {
    try {
      const currentUserName = Meteor.user().username;
      const currentTask = await Meteor.callAsync('tasks.getTask', _id);
  
      if (currentUserName === currentTask.createBy) {
        await Meteor.callAsync("tasks.delete", _id);
      } else {
        alert("Só o usuário que criou a tarefa pode deletá-la");
      }
  
    } catch (error) {
      console.error("Erro ao tentar excluir a tarefa:", error);
      alert("Ocorreu um erro ao tentar excluir a tarefa.");
    }
  
    handleMenuClose();
  };

  const toggleUpdateFormVisibility = (taskId) => {
    setSelectedTaskId(taskId); 
    setUpdateFormVisible(!isUpdateFormVisible); 
  };

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <List dense sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
        {tasks.map((task) => {
          const labelId = `task-${task._id}`;
          return (
            <ListItem
              key={task._id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(task._id)}
                  checked={checked.includes(task._id)}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              
              <ListItemButton>
                <ListItemAvatar>
                  <Stack direction="row" spacing={2}>
                    <Avatar sx={{ bgcolor: 'black', color: 'white' }}>
                      <AssignmentIcon />
                    </Avatar>
                  </Stack>
                </ListItemAvatar>
                <ListItemText
                      id={labelId}
                      primary={task.name}
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary" component="span">
                            {task.status}
                          </Typography>
                          <br />
                          <Typography variant="body2" color="text.secondary" component="span">
                            {task.date}
                          </Typography>
                        </>
                      }
                      sx={{ color: 'black' }}
/>
                <ThreePonitIcon onClick={(event) => handleMenuOpen(event, task._id)} />
              </ListItemButton>
              <TaskOptionsButton
                 anchorEl={menuState.anchorEl ? menuState.anchorEl : null}
                handleClose={handleMenuClose}
                taskId={menuState.selectedTaskId}
                toggleUpdateFormVisibility={() => toggleUpdateFormVisibility(menuState.selectedTaskId)}
                onDelete={ handleDelete}
              />
            </ListItem>
          );
        })}
      </List>

      {isUpdateFormVisible && <UpdateForm taskId={selectedTaskId} setShowForm={setUpdateFormVisible} />}
    </>
  );
};
