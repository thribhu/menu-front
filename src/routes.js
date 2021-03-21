import AddOptions from 'views/Options/addOption'
import OptionsList from 'views/Options'
import Groups from 'views/Groups';
import AddGroup from 'views/Groups/addGroup'
import ListItems from 'views/Items';
import AddItem from 'views/Items/addItem';
import Modifiers from 'views/Modifiers'
import AddModifier from 'views/Modifiers/addModifier';
export default function () {
    return [
        {
            path: "/options",
            name: "Options",
            icon: '/assets/options.svg',
            component: OptionsList,
            layout: "/pizza",
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
            icon: '/assets/modifier.svg',
            component: Modifiers,
            layout: "/pizza",
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
            icon: '/assets/menu.svg',
            component: ListItems,
            layout: "/pizza",
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
            icon: '/assets/groups.svg',
            component: Groups,
            layout: "/pizza",
            children: [
            ]
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