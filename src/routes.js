import AddOptions from 'views/Options/addOption'
import OptionsList from 'views/Options'
import Groups from 'views/Groups';
import AddGroup from 'views/Groups/addGroup'
import ListItems from 'views/Items';
import AddItem from 'views/Items/addItem';
import Modifiers from 'views/Modifiers'
import AddModifier from 'views/Modifiers/addModifier';
import { FaObjectGroup, FaSitemap, FaPizzaSlice, FaDiceD6 } from 'react-icons/fa'
export default function () {
    return [
        {
            path: "/options",
            name: "Options",
            icon: (<div><FaSitemap/></div>),
            component: OptionsList,
            layout: "/pizza",
	    num: 2
        },
        {
            path: "/addOption",
            name: "Add option",
            icon: "",
            component: AddOptions,
            layout: "/pizza",
        },
        {
            path: '/modifiers',
            name: 'Modifiers',
            icon: (<div><FaDiceD6/></div>),
            component: Modifiers,
            layout: "/pizza",
	    num: 1
        },
        {
            path: "/addModifier",
            name: "Add Modifier",
            icon: "",
            component: AddModifier,
            layout: "/pizza"
        },
        {
            path: '/items',
            name: 'Items',
            icon: (<div><FaPizzaSlice/></div>),
            component: ListItems,
            layout: "/pizza",
	    num: 4
        },
        {
            path: "/addItem",
            name: "Add Item",
            icon: "",
            component: AddItem,
            layout: "/pizza"
        }
        ,{
            path: '/groups',
            name: 'Groups',
            icon: (<div><FaObjectGroup/></div>),
            component: Groups,
            layout: "/pizza",
	    num: 3
        },
        {
            path: "/addgroup",
            name: "add option group",
            icon: "",
            component: AddGroup,
            layout: "/pizza"
        }
    ]
}
