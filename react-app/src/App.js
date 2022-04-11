import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute'
import { authenticate } from './store/session';

import Home from './components/Home/Home'
import UserPage from "./components/HomeView/UserPage";

function App() {
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch()
		const user = useSelector((state) => state.session.user);

    useEffect(() => {
        (async() => {
            await dispatch(authenticate());
            setLoaded(true)
        })()
    }, [dispatch])

    if(!loaded) {
        return null
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <Route path="/" exact={true}>
            <Home />
          </Route>

					<ProtectedRoute path="/app">
						<UserPage user={user} />
					</ProtectedRoute>

        </Switch>
      </BrowserRouter>
    );
};

export default App
