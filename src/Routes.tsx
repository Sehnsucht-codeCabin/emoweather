import { Route } from 'react-router-dom';
import Home from "./pages/Home";
import MoodResult from "./pages/MoodResult";

const Routes = () => (
  <>
    <Route exact path="/" component={Home} />
    <Route path="/result" component={MoodResult} />
  </>
);

export default Routes;