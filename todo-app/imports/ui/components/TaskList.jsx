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
import Popover from '@mui/material/Popover';
import { TasksCollection } from '../../api/TasksCollection';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { TreePoitIcon } from './TreePoitIcon';
import { TaskOptionsButton } from './TaskOptionsButton';

export const TaskList = () => {
  const isLoading = useSubscribe("tasks");
  const tasks = useTracker(() => TasksCollection.find({}).fetch());
  const [checked, setChecked] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {tasks.map((task) => {
        const labelId = tasks._id; 
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
                  <Avatar sx={{ bgcolor: "black", color: "white" }}>
                    <AssignmentIcon />
                  </Avatar>
                </Stack>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${task.name}`} sx={{ color: "black" }} />
              <TreePoitIcon onClick={handleMenuOpen} />
            </ListItemButton>
          </ListItem>
        );
      })}
      <TaskOptionsButton anchorEl={anchorEl} handleClose={handleMenuClose} />
    </List>
  );
};