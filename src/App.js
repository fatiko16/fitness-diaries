import { Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import useAuthListener from "./hooks/use-auth-listener";
import PrivateRoute from "./UI/PrivateRoute";
import UserContext from "./contexts/UserContext";
import Layout from "./UI/Layout";
import NotFound from "./pages/NotFound";
import Workouts from "./pages/Workouts";

function App() {
  const user = useAuthListener();

  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path={ROUTES.SIGN_UP} element={<Signup />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <Layout>
              <PrivateRoute auth={user}>
                <HomePage />
              </PrivateRoute>
            </Layout>
          }
        />
        <Route
          path={ROUTES.WORKOUTS + "/*"}
          element={
            <Layout>
              <PrivateRoute auth={user}>
                <Workouts />
              </PrivateRoute>
            </Layout>
          }
        ></Route>
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
