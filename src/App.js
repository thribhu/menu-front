import "./App.css";
import Layout from "Layouts";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "createStore";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {createBrowserHistory} from 'history'

//history object
const { store, persistor } = configureStore();
let history = createBrowserHistory()
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins"],
  },
});
window.onbeforeunload = function() {
   localStorage.clear();
}
function App(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Switch>
              <Route path="/" component={Layout}/>
            </Switch>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
export default App;
