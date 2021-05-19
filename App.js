/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react';
import './App.css';
import CustomerList from './components/Customerlist';
import CalendarView from './components/CalendarView';
import Trainings from './components/Trainings';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



function App() {

  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Customers" />
          <Tab value="two" label="Trainings" />
          <Tab value="three" label="Calendar" />
        </Tabs  >
      </AppBar>
      {value === 'one' && <div> <CustomerList /></div>}
      {value === 'two' && <div> <Trainings /></div>}
      {value === 'three' && <div> <CalendarView /></div>}
    </div>
  );
}

export default App;