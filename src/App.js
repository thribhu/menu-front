import './App.css';
import Layout from 'Layouts'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "createStore";
import Options from 'views/Options'
const {store, persistor} = configureStore();
function App(props) {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Layout />
      </Router>
    </PersistGate>
  </Provider>
  );
}
export default App;