import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import './Tasks.css'
import { TasksCollection } from '../../api/TasksCollection'; 

import { useTracker, useSubscribe } from 'meteor/react-meteor-data';

export const TaskList = (tasks) =>{


  const [checked, setChecked] = React.useState([1]);

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

  const hello = (value) => console.log("item " + value)

  if (isLoading()){
    return <div> Loading... </div>
  }

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {tasks.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (

         
            <ListItem
            
            key={value}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.includes(value)}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <button className='tasks-button' onClick={ () => hello(value +1)}>
                <ListItemText id={labelId} primary={`${value.name}`} />
              </button>
            </ListItemButton>
          </ListItem>
          
          
        );
      })}
    </List>
  );
}
