import { useEffect } from 'react'
import reducer, {
    getCrmDashboardData,
    useAppDispatch,
    useAppSelector,

} from '../CrmDashboard/store'
import { injectReducer } from '@/store/'

import Loading from '@/components/shared/Loading'
import Statistic from '../CrmDashboard/components/Statistic'
import Leads from '../CrmDashboard/components/Leads'

import AdaptableCard from '@/components/shared/AdaptableCard'
import CustomersTable from '../../crm/Customers/components/CustomersTable'
import CustomersTableTools from '../../crm/Customers//components/CustomersTableTools'
import CustomerStatistic from '../../crm/Customers/components/CustomerStatistic'


injectReducer('crmDashboard', reducer)

const CrmDashboard = () => {
    const dispatch = useAppDispatch()

    const { statisticData, leadByRegionData, recentLeadsData, emailSentData } =
        useAppSelector((state) => state.crmDashboard.data.dashboardData)
    const loading = useAppSelector((state) => state.crmDashboard.data.loading)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getCrmDashboardData())
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            <Loading loading={loading}>
                <Statistic data={statisticData} />
                
                
            </Loading>
        </div>
    )
}

export default CrmDashboard