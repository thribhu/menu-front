import routes from 'routes';
import { map, sortBy } from 'lodash'
import { useLocation, useHistory } from 'react-router-dom'
import classname from 'classnames';
import styles from './Sidebar.module.sass'
import React from 'react';
export default function SidebarRoutes(props) {
    const {activeRoute, setActive} = props
    const history = useHistory();
    const sortedRoutes = sortBy(routes(), ["name"]);
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
                    className={classname([styles.link_container, styles.isALinkContainer])}
                    key={route.name} 
                    onClick={() => handleClick(route)}
                >
                    <div className={classname(styles.avatar_container)}>
                        <img src={route.icon} className={classname(styles.link_avatar)} />
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