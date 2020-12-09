import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { Switch, Route, withRouter } from 'react-router-dom'
import { getUser, logout } from './services/userService';
import { useState } from 'react';


function App(props) {
  const [ userState, setUserState ] = useState({ user: getUser() });

  function handleSignupOrLogin(){
    setUserState({ user:getUser()})
    props.history.push('./dashboard')
  }

  function handleLogout(){
    logout()
    setUserState({user:null})
    props.history.push('/')
  }

  return (
    <div className="App">
    <Header user={userState.user}
     handleLogout={handleLogout}/>
      <Switch>
        <Route exact path ='/' render={props=>
          <HomePage/>
        }/>
        <Route exact path ='/dashboard' render={props=>
          <DashboardPage/>
        }/>
        <Route exact path ='/login' render={props=>
          <LoginPage handleSignupOrLogin={handleSignupOrLogin}/>
        }/>
        <Route exact path ='/signup' render={props=>
          <SignupPage handleSignupOrLogin={handleSignupOrLogin}/>
        }/>
      </Switch>
    <Footer/>
    </div>
 
  );
}

export default withRouter(App);
