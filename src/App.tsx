import Routes from "./Routes";
import './App.scss';
import { BrowserRouter, Switch } from "react-router-dom";
import Frame from './frame';
import { EmoweatherProvider } from "./context/Provider";
import { Suspense } from "react";

const App = () => (
  <BrowserRouter>
    <EmoweatherProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Frame>
          <Switch>
            <Routes />
          </Switch>
        </Frame>
      </Suspense>
    </EmoweatherProvider>
  </BrowserRouter>
);

export default App;
