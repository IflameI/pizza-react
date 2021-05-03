import React from 'react';
import { Header } from './components';
import { Home, Cart } from './pages';
import { Route } from 'react-router-dom';

function App() {
  //const dispatch = useDispatch();  используем в app  если нужно получить данные один раз без лишних ренедров
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Route path='/' component={Home} exact />
        <Route path='/cart' component={Cart} exact />
      </div>
    </div>
  );
}

export default App;
