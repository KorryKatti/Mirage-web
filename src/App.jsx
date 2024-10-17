import React, { useState } from 'react';
import Body from './components/Body';

function App() {
  const [toggleTheme, setToggleTheme] = useState(false); 

  const handleToggle = () => {
    setToggleTheme((prevTheme) => !prevTheme);
  };

  return (
    <Body toggleTheme={toggleTheme} handleToggle={handleToggle} />
  );
}

export default App;
