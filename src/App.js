import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Admin from "./Components/Admin/Admin";
import Home from './Components/Home/Home';
import Deals from './Components/Deals/Deals';
import NoMatch from './Components/NoMatch/NoMatch';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import AppBar from './Components/AppBar/AppBar';
import Login from './Components/Login/Login.js';
import AddMobile from './Components/Admin/AddMobile';
import Mobiles from './Components/Mobiles/Mobiles';
import Checkout from './Components/Checkout/Checkout';
import PlaceOrder from './Components/PlaceOrder/PlaceOrder';
import Orders from './Orders/Orders';
import OrderControl from './Orders/OrderControl';
export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <div>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <AppBar />
          <Switch>
            <Route exact path="/"><Home /></Route>

            <Route path="/home"><Home /></Route>

            <PrivateRoute path="/mobiles"><Mobiles /></PrivateRoute>

            <PrivateRoute path="/checkout/:id"><Checkout/></PrivateRoute>

            <PrivateRoute path="/placeOrder/:id"><PlaceOrder/></PrivateRoute>

            <PrivateRoute path="/orders"><Orders/></PrivateRoute>

            <PrivateRoute path="/orderControl"><OrderControl/></PrivateRoute>

            <PrivateRoute path="/admin"><Admin /></PrivateRoute>

            <PrivateRoute path="/addMobile"><AddMobile /></PrivateRoute>

            <Route path="/deals"> <Deals /></Route>

            <Route path="/login"><Login/></Route>

            <Route path="*"><NoMatch /></Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;