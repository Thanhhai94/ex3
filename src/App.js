import './App.css';
import Main from './components/MainComponent'
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import {ConfigureStore} from './redux/configureStore'

const store = ConfigureStore()
class App extends React.Component {

  render(){
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Main />
          </div>
        </Router>
      </Provider>
      
    );
  }
  
}

export default App;
