import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },

    {
        key: 'calendar',
        path: '/calendar',
        component: lazy(() => import('@/views/crm/Calendar/Calendar')),
        authority: [],
    },

    {
        key: 'customerDetail',
        path: '/customers',
        component: lazy(() => import('@/views/crm/Customers/Customers')),
        authority: [],
    },

    {
        key: 'testing',
        path: '/testing',
        component: lazy(() => import('@/views/testing')),
        authority: [],
    },
    {
        key: 'finances',
        path: '/finances',
        component: lazy(() => import('@/views/sales/SalesDashboard/SalesDashboard')),
        authority: [],
    },
    {
        key: 'services',
        path: '/services',
        component: lazy(() => import('@/views/services')),
        authority: [],
    },
    {
        key: 'program',
        path: '/program',
        component: lazy(() => import('@/views/program/Program')),
        authority: [],
    },
    {
        key: 'programCalendar',
        path: '/program/calendar',
        component: lazy(() => import('@/views/program/ProgramCalendar')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() =>
            import('@/views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },
]