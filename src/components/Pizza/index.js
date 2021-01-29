import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import styles from './Pizza.module.sass'
import classname from 'classnames';
import routes from 'routes';
import {map} from 'lodash'
import Options from 'views/Options';
import AddOption from 'views/Options/addOption'
export default function Pizza(props){
    const {component} = props;
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
          if (prop.children) {
            return getRoutes(prop.children);
          }
          if (prop.layout === "/pizza") {
              let _routes = <Route
                path={prop.path}
                component={prop.component}
                key={key}
              />
              return _routes
          } else {
            return null;
          }
        });
      };
    return (
        <div className={classname(styles.pizza)}>
          {/* <div className={classname(styles.topBar)}>

          </div> */}
           <Switch>
               {getRoutes(routes())}
               {/* <Route path="/options" component={Options}/>
               <Route path="/addOption" component={AddOption}/> */}
           </Switch> 
        </div>
    )
}