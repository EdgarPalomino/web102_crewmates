import { useRoutes } from "react-router";
import Gang from "./Gang";
import Pirate from "./Pirate";
import Create from "./Create";
import Edit from "./Edit";
import "./App.css";

const App = () => {

  const routes = useRoutes([
    {path: "/", element: <Gang />},
    {path: "/pirate/:id", element: <Pirate />},
    {path: "/create-pirate", element: <Create />},
    {path: "/edit-pirate/:id", element: <Edit />}
  ]);

  return routes;

};

export default App;
