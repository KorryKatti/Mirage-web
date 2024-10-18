import React from 'react';
import Body from './components/Body';
import {useState} from 'react';
function App() {
  const [toggleTheme, setToggleTheme] = useState(false);

  const handleToggle = () => {
    setToggleTheme((prev) => !prev);
  };

  return (
    <Body toggleTheme={toggleTheme} handleToggle={handleToggle} />
  );
};



export default App;
