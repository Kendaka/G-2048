import React from 'react';
import Grid from './Components/Grid';
import Header from './Components/Header';
import Score from './Components/Score';

const App = () => {
  return (
    <div className='bg-gray-900'>
      <Header/>
      <Score/>
      <Grid/>
    </div>
  )
}
export default App;