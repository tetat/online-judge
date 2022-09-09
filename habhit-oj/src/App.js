import logo from './logo.svg';
import './App.css';
import Header from './components/Shared/Header/Header';
import Footer from './components/Shared/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Problems from './components/Problems/Problems';
import About from './components/About/About';
import Login from './components/Login/Login/Login';
import Register from './components/Login/Register/Register';
import NotFound from './components/Shared/NotFound/NotFound';
import ForgetPassword from './components/Login/Login/ForgetPassword/ForgetPassword';
import RequireAuth from './components/Login/RequireAuth/RequireAuth';
import User from './components/User/User';
import Users from './components/Users/Users';
import Problem from './components/Problems/Problem/Problem';

function App() {
  return (
    <div className="App">
      <Header></Header>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/problems' element={<Problems></Problems>}></Route>
        <Route path='/problems/:probId' element={<Problem></Problem>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path="/forgetpassword" element={<ForgetPassword></ForgetPassword>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/users' element={
          <RequireAuth>
            <Users></Users>
          </RequireAuth>
        }></Route>
        <Route path='/user/:userId' element={
          <RequireAuth>
            <User></User>
          </RequireAuth>
        }></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
