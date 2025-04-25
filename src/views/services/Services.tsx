import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'
import Avatar from '@/components/ui/Avatar'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import { HiOutlineCalendar, HiOutlineClock, HiOutlineUser } from 'react-icons/hi'
import AdaptableCard from '@/components/shared/AdaptableCard'

const { Tr, Th, Td, THead, TBody } = Table

type Service = {
    id: string
    name: string
    description: string
    duration: number
    price: number
    status: 'active' | 'inactive'
    category: string
}

const services: Service[] = [
    {
        id: '1',
        name: 'Personal Training Session',
        description: 'One-on-one training session with a certified trainer',
        duration: 60,
        price: 75,
        status: 'active',
        category: 'Training'
    },
    {
        id: '2',
        name: 'Group Fitness Class',
        description: 'Group workout session for up to 10 people',
        duration: 45,
        price: 25,
        status: 'active',
        category: 'Group'
    },
    {
        id: '3',
        name: 'Nutrition Consultation',
        description: 'Personalized nutrition plan and guidance',
        duration: 90,
        price: 120,
        status: 'active',
        category: 'Nutrition'
    },
    {
        id: '4',
        name: 'Recovery Session',
        description: 'Guided recovery and stretching session',
        duration: 30,
        price: 40,
        status: 'active',
        category: 'Recovery'
    },
    {
        id: '5',
        name: 'Fitness Assessment',
        description: 'Comprehensive fitness evaluation and goal setting',
        duration: 75,
        price: 85,
        status: 'active',
        category: 'Assessment'
    }
]

const columnHelper = createColumnHelper<Service>()

const Services = () => {
    const [serviceList, setServiceList] = useState<Service[]>(services)

    const columns = [
        columnHelper.accessor('name', {
            header: 'Service Name',
            cell: (props) => (
                <div className="flex items-center">
                    <Avatar 
                        className="mr-2" 
                        shape="circle" 
                        size={40} 
                        icon={<HiOutlineUser />} 
                    />
                    <div>
                        <div className="font-semibold">{props.row.original.name}</div>
                        <div className="text-xs">{props.row.original.category}</div>
                    </div>
                </div>
            ),
        }),
        columnHelper.accessor('description', {
            header: 'Description',
        }),
        columnHelper.accessor('duration', {
            header: 'Duration',
            cell: (props) => (
                <div className="flex items-center">
                    <HiOutlineClock className="mr-2" />
                    <span>{props.row.original.duration} min</span>
                </div>
            ),
        }),
        columnHelper.accessor('price', {
            header: 'Price',
            cell: (props) => (
                <div className="font-semibold">
                    ${props.row.original.price}
                </div>
            ),
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (props) => {
                const status = props.row.original.status
                return (
                    <Tag
                        className={
                            status === 'active'
                                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100'
                                : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100'
                        }
                    >
                        {status === 'active' ? 'Active' : 'Inactive'}
                    </Tag>
                )
            },
        }),
        columnHelper.accessor('id', {
            header: 'Actions',
            cell: (props) => (
                <div className="flex gap-2">
                    <Button size="xs" variant="solid">Edit</Button>
                    <Button 
                        size="xs" 
                        variant="plain" 
                        onClick={() => handleDeleteService(props.row.original.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        }),
    ]

    const table = useReactTable({
        data: serviceList,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const handleDeleteService = (id: string) => {
        setServiceList(serviceList.filter(service => service.id !== id))
    }

    return (
        <div className="container mx-auto">
            <div className="mb-4 flex items-center justify-between">
                <h3>Services</h3>
                <Button variant="solid" size="sm">Add New Service</Button>
            </div>
            <AdaptableCard>
                <div className="overflow-x-auto">
                    <Table>
                        <THead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <Th key={header.id} colSpan={header.colSpan}>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </Th>
                                        )
                                    })}
                                </Tr>
                            ))}
                        </THead>
                        <TBody>
                            {table.getRowModel().rows.map((row) => {
                                return (
                                    <Tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <Td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </Td>
                                            )
                                        })}
                                    </Tr>
                                )
                            })}
                        </TBody>
                    </Table>
                </div>
            </AdaptableCard>
        </div>
    )
}

export default Services