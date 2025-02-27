import * as React from 'react'; 
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

export const TaskList = () => {
  const isLoading = useSubscribe("tasks");
  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
  const [checked, setChecked] = React.useState([]);
  const [menuState, setMenuState] = React.useState({ anchorEl: null, selectedTaskId: null });
  const [isUpdateFormVisible, setUpdateFormVisible] = React.useState(false);
  const [selectedTaskId, setSelectedTaskId] = React.useState(null); 

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

  const handleDelete = (_id) => {
    Meteor.callAsync("tasks.delete", _id);
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
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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
                <ListItemText id={labelId} primary={task.name} sx={{ color: 'black' }} />
                <ThreePonitIcon onClick={(event) => handleMenuOpen(event, task._id)} />
              </ListItemButton>
              <TaskOptionsButton
                anchorEl={menuState.anchorEl}
                handleClose={handleMenuClose}
                taskId={menuState.selectedTaskId}
                toggleUpdateFormVisibility={() => toggleUpdateFormVisibility(menuState.selectedTaskId)}
                onDelete={handleDelete}
              />
            </ListItem>
          );
        })}
      </List>

      {isUpdateFormVisible && <UpdateForm taskId={selectedTaskId} setShowForm={setUpdateFormVisible} />}
    </>
  );
};
