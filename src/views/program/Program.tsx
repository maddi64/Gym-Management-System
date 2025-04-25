import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'
import Progress from '@/components/ui/Progress'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import { HiOutlineCalendar, HiOutlineClock, HiOutlineChartBar, HiPlus } from 'react-icons/hi'
import AdaptableCard from '@/components/shared/AdaptableCard'
import { useNavigate } from 'react-router-dom'

const { Tr, Th, Td, THead, TBody } = Table

type Program = {
    id: string
    name: string
    description: string
    duration: number
    progress: number
    status: 'active' | 'completed' | 'upcoming'
    startDate: string
    endDate: string
}

const programs: Program[] = [
    {
        id: '1',
        name: 'Weight Loss Challenge',
        description: '12-week program designed for maximum weight loss results',
        duration: 12,
        progress: 75,
        status: 'active',
        startDate: '2023-01-15',
        endDate: '2023-04-09'
    },
    {
        id: '2',
        name: 'Strength Building',
        description: 'Progressive strength training program',
        duration: 8,
        progress: 100,
        status: 'completed',
        startDate: '2022-10-01',
        endDate: '2022-11-26'
    },
    {
        id: '3',
        name: 'Marathon Prep',
        description: 'Training program for marathon runners',
        duration: 16,
        progress: 0,
        status: 'upcoming',
        startDate: '2023-05-01',
        endDate: '2023-08-20'
    },
    {
        id: '4',
        name: 'Flexibility & Mobility',
        description: 'Improve overall flexibility and joint mobility',
        duration: 6,
        progress: 33,
        status: 'active',
        startDate: '2023-02-10',
        endDate: '2023-03-24'
    },
    {
        id: '5',
        name: 'Nutrition Reset',
        description: 'Reset eating habits and establish healthy patterns',
        duration: 4,
        progress: 50,
        status: 'active',
        startDate: '2023-03-01',
        endDate: '2023-03-29'
    }
]

const columnHelper = createColumnHelper<Program>()

const ProgramList = () => {
    const [programList, setProgramList] = useState<Program[]>(programs)
    const navigate = useNavigate()

    const columns = [
        columnHelper.accessor('name', {
            header: 'Program Name',
            cell: (props) => (
                <div>
                    <div className="font-semibold">{props.row.original.name}</div>
                    <div className="text-xs text-gray-500">{props.row.original.description}</div>
                </div>
            ),
        }),
        columnHelper.accessor('duration', {
            header: 'Duration',
            cell: (props) => (
                <div className="flex items-center">
                    <HiOutlineCalendar className="mr-2" />
                    <span>{props.row.original.duration} weeks</span>
                </div>
            ),
        }),
        columnHelper.accessor('progress', {
            header: 'Progress',
            cell: (props) => (
                <div className="min-w-[150px]">
                    <Progress percent={props.row.original.progress} />
                    <div className="text-xs mt-1 text-right">{props.row.original.progress}% Complete</div>
                </div>
            ),
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (props) => {
                const status = props.row.original.status
                const statusColors = {
                    active: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100',
                    completed: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100',
                    upcoming: 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-100'
                }
                
                return (
                    <Tag className={statusColors[status]}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Tag>
                )
            },
        }),
        columnHelper.accessor('startDate', {
            header: 'Date Range',
            cell: (props) => (
                <div>
                    <div>{props.row.original.startDate}</div>
                    <div className="text-gray-500">to</div>
                    <div>{props.row.original.endDate}</div>
                </div>
            ),
        }),
        columnHelper.accessor('id', {
            header: 'Actions',
            cell: (props) => (
                <div className="flex gap-2">
                    <Button 
                        size="xs" 
                        variant="solid"
                        onClick={() => navigate('/program/calendar')}
                    >
                        View
                    </Button>
                    <Button 
                        size="xs" 
                        variant="plain" 
                        onClick={() => handleDeleteProgram(props.row.original.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        }),
    ]

    const table = useReactTable({
        data: programList,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const handleDeleteProgram = (id: string) => {
        setProgramList(programList.filter(program => program.id !== id))
    }

    const handleCreateNewProgram = () => {
        navigate('/program/calendar')
    }

    return (
        <div className="container mx-auto">
            <div className="mb-4 flex items-center justify-between">
                <h3>Programs</h3>
                <Button 
                    variant="solid" 
                    size="sm" 
                    icon={<HiPlus />}
                    onClick={handleCreateNewProgram}
                >
                    Create New Program
                </Button>
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

export default ProgramList