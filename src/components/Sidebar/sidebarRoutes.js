import routes from 'routes';
import { map, sortBy } from 'lodash'
import { useLocation, useHistory } from 'react-router-dom'
import classname from 'classnames';
import styles from './Sidebar.module.sass'
export default function SidebarRoutes() {
    const location = useLocation();
    const history = useHistory();
    const currentPath = location.pathname;
    const sortedRoutes = sortBy(routes(), ["name"]);
    const handleClick = (route) => {
        if (!route) return null;
        let { component } = route
        history.push(route.path)
    }

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