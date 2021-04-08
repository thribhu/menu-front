import routes from 'routes';
import { map, sortBy } from 'lodash'
import { useLocation, useHistory } from 'react-router-dom'
import classname from 'classnames';
import styles from './Sidebar.module.sass'
import React from 'react'
import {FaObjectGroup, FaSitemap, FaPizzaSlice, FaDiceD6 } from 'react-icons/fa'
export default function SidebarRoutes(props) {
    const {activeRoute, setActive} = props
    const history = useHistory();
    const location = useLocation()
    const sortedRoutes = sortBy(routes(), ["num"]);
    const handleClick = (route) => {
        if (!route) return null;
        setActive(route.path)
    }
    React.useEffect(() => {
        history.push(activeRoute)
    }, 
    [activeRoute])
    return (
        <div className={classname(styles.nav_links)}>
            {map(sortedRoutes, route =>
                {
                    if(!route.icon) return null
                return (
                <div 
                    className={classname(styles.link_container, styles.isALinkContainer, {[styles.isActive]: "/" + route.name.toLowerCase() === location.pathname ? true : false})}
                    key={route.name} 
                    onClick={() => handleClick(route)}
                >
                    <div className={classname(styles.avatar_container)}>
                        {route.icon}
                    </div>
                    <div className={classname(styles.link_text)}>
                        <p>
                            {route.name}
                        </p>
                    </div>
                </div>
                )}
            )}
        </div>
    )
}
