import "./App.css";
import Layout from "Layouts";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "createStore";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
const { store, persistor } = configureStore();
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins"],
  },
});
function App(props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path="/" component={Layout}/>
              <Redirect from="/" to="/items"/>
            </Switch>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
export default App;
