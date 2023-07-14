import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes,
    Navigate,
    useLocation,
} from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import HomePage from './pages/basic/HomePage';
import LoginForm from './pages/auth/LoginForm';
import History from './pages/history/History';
import RegisterForm from './pages/auth/RegisterForm';
import Function from './pages/basic/Function';

function App() {
    const token = useSelector((state) => state.auth.token);
    console.log('TOKEN', token);
    // Get the current location
    const location = useLocation();

    // Redirect the user to a different page if they navigate back to the login route
    // if (location.pathname === '/login' && token !== null) {
    //     return <Navigate to='/map' replace />;
    // } else if (
    //     (location.pathname === '/map' || location.pathname === '/history') &&
    //     !token
    // ) {
    //     return <Navigate to='/login' replace />;
    // }

    return (
        <div className='App'>
            <Routes>
                <Route
                    path='/'
                    element={
                        token ? (
                            <Navigate to='/map' replace />
                        ) : (
                            <Navigate to='/login' replace />
                        )
                    }
                />

                {!token ? (
                    <>
                        <Route path='/login' element={<LoginForm />} />
                        <Route path='/signup' element={<RegisterForm />} />
                    </>
                ) : (
                    <>
                        <Route path='/map' element={<HomePage />} />
                        <Route path='/history' element={<History />} />
                        <Route path='/function' element={<Function />} />
                    </>
                )}
            </Routes>
        </div>
    );
}

function Root() {
    return (
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    );
}

export default Root;
