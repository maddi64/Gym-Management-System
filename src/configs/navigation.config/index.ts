import { APP_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'
import { ADMIN, USER } from '@/constants/roles.constant'


const navigationConfig: NavigationTree[] = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },

    /** Example purpose only, please remove */
    {
        key: 'calendar',
        path: `/calendar`,
        title: 'Calendar',
        translateKey: 'calendar',
        icon: 'calendar',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'customerDetail',
        path: '/customers',
        title: 'Customers',
        translateKey: 'customers',
        icon: 'clientManagement',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'program',
        path: '/program',
        title: 'Program',
        translateKey: 'program',
        icon: 'program',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'testing',
        path: '/testing',
        title: 'Testing',
        translateKey: 'testing',
        icon: 'testing',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'services',
        path: '/services',
        title: 'Services',
        translateKey: 'services',
        icon: 'services',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'finances',
        path: '/finances',
        title: 'Finances',
        translateKey: 'finances',
        icon: 'finances',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },

    {
        key: 'collapseMenu',
        path: '',
        title: 'Collapse Menu',
        translateKey: 'nav.collapseMenu.collapseMenu',
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'collapseMenu.item1',
                path: '/collapse-menu-item-view-1',
                title: 'Collapse menu item 1',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'collapseMenu.item2',
                path: '/collapse-menu-item-view-2',
                title: 'Collapse menu item2',
                translateKey: 'nav.collapseMenu.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'collapseMenu.item3',
                path: '/collapse-menu-item-view-3',
                title: 'Collapse menu item3',
                translateKey: 'nav.collapseMenu.item3',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['admin', 'user'],
                subMenu: [],
            },
        ],
    },
    {
        key: 'groupMenu',
        path: '',
        title: 'Group Menu',
        translateKey: 'nav.groupMenu.groupMenu',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
        subMenu: [
            {
                key: 'groupMenu.single',
                path: '/group-single-menu-item-view',
                title: 'Group single menu item',
                translateKey: 'nav.groupMenu.single',
                icon: 'groupSingleMenu',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'groupMenu.collapse',
                path: '',
                title: 'Group collapse menu',
                translateKey: 'nav.groupMenu.collapse.collapse',
                icon: 'groupCollapseMenu',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'groupMenu.collapse.item1',
                        path: '/group-collapse-menu-item-view-1',
                        title: 'Menu item 1',
                        translateKey: 'nav.groupMenu.collapse.item1',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'groupMenu.collapse.item2',
                        path: '/group-collapse-menu-item-view-2',
                        title: 'Menu item 2',
                        translateKey: 'nav.groupMenu.collapse.item2',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                ],
            },
        ],
    },
]

export default navigationConfig
