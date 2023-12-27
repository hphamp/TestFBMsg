import { HashRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import DefaultLayout from '~/components/Layout/DefaultLayout';
import UserInfoLayout from '~/components/Layout/UserInfoLayout';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
function App() {
    // const navigate = useNavigate();
    useEffect(() => {
        // const token = localStorage.getItem('token') !== '';
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const expirationTime = decodedToken.exp * 1000;
            const currentTime = new Date().getTime();
            console.log('expirationTime:' + expirationTime);
            console.log('currentTime' + currentTime);
            if (expirationTime < currentTime) {
                localStorage.removeItem('token');
                Navigate('/login');
            }
        }
    }, []);
    return (
        <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Layout = route.layout || DefaultLayout;
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}

                        {privateRoutes.map((route, index) => {
                            const Layout = route.layout || UserInfoLayout;
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
        </Router>
    );
}

export default App;
