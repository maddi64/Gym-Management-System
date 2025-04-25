import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineCalendar,
    HiOutlineUserGroup,
    HiOutlineDocumentAdd,
    HiOutlineChartSquareBar,
    HiOutlineSparkles,
    HiOutlineCurrencyDollar
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    calendar: <HiOutlineCalendar />,
    clientManagement: <HiOutlineUserGroup />,
    program: <HiOutlineDocumentAdd />,
    testing: <HiOutlineChartSquareBar />, 
    services: <HiOutlineSparkles />, 
    finances: <HiOutlineCurrencyDollar />
}

export default navigationIcon
