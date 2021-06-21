import Routes from "./Routes";
import './App.scss';
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Frame from './frame';
import store from "./store";

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Frame>
          <Switch>
            <Routes />
          </Switch>
      </Frame>
    </Provider>
  </BrowserRouter>
);

export default App;
