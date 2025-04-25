import { useState } from 'react'
import Calendar from '@/components/shared/CalendarView'
import Container from '@/components/shared/Container'
import Card from '@/components/ui/Card'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import FormItem from '@/components/ui/Form/FormItem'
import { FormContainer } from '@/components/ui/Form'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { HiPlus, HiOutlineDocumentDuplicate, HiOutlineCalendar } from 'react-icons/hi'
import dayjs from 'dayjs'
import type { DateSelectArg, EventClickArg } from '@fullcalendar/core'

interface Exercise {
    id: string
    title: string
    sets: string
    reps: string
    weight: string
    rest: string
}

interface Session {
    id: string
    title: string
    start: string
    end?: string
    exercises: Exercise[]
    allDay?: boolean
    eventColor?: string
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Session title is required'),
    exercises: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required('Exercise title is required'),
            sets: Yup.string().required('Sets are required'),
            reps: Yup.string().required('Reps are required'),
            weight: Yup.string(),
            rest: Yup.string()
        })
    )
})

const ProgramCalendar = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [sessions, setSessions] = useState<Session[]>([])
    const [editingSession, setEditingSession] = useState<Session | null>(null)

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        setSelectedDate(selectInfo.start)
        setEditingSession(null)
        setIsDialogOpen(true)
    }

    const handleEventClick = (clickInfo: EventClickArg) => {
        const session = sessions.find(s => s.id === clickInfo.event.id)
        if (session) {
            setEditingSession(session)
            setIsDialogOpen(true)
        }
    }

    const handleDialogClose = () => {
        setIsDialogOpen(false)
        setEditingSession(null)
    }

    const handleSessionSubmit = (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setSubmitting(true)
        
        const newSession: Session = {
            id: editingSession?.id || Math.random().toString(36).substring(2, 9),
            title: values.title,
            start: selectedDate ? dayjs(selectedDate).format() : dayjs().format(),
            exercises: values.exercises,
            allDay: true,
            eventColor: 'blue'
        }
        
        if (editingSession) {
            setSessions(sessions.map(session => 
                session.id === editingSession.id ? newSession : session
            ))
        } else {
            setSessions([...sessions, newSession])
        }
        
        setSubmitting(false)
        setIsDialogOpen(false)
    }

    const addExercise = (values: any, setValues: (values: any) => void) => {
        const newExercise = {
            id: Math.random().toString(36).substring(2, 9),
            title: '',
            sets: '',
            reps: '',
            weight: '',
            rest: ''
        }
        
        setValues({
            ...values,
            exercises: [...values.exercises, newExercise]
        })
    }

    const removeExercise = (index: number, values: any, setValues: (values: any) => void) => {
        const updatedExercises = [...values.exercises]
        updatedExercises.splice(index, 1)
        
        setValues({
            ...values,
            exercises: updatedExercises
        })
    }

    const initialValues = {
        title: editingSession?.title || '',
        exercises: editingSession?.exercises || [
            {
                id: Math.random().toString(36).substring(2, 9),
                title: '',
                sets: '',
                reps: '',
                weight: '',
                rest: ''
            }
        ]
    }

    return (
        <Container>
            <div className="mb-4 flex items-center justify-between">
                <h3>Program Calendar</h3>
                <Button 
                    variant="solid" 
                    size="sm" 
                    icon={<HiPlus />}
                    onClick={() => {
                        setSelectedDate(new Date())
                        setEditingSession(null)
                        setIsDialogOpen(true)
                    }}
                >
                    Create New Session
                </Button>
            </div>
            
            <Card>
                <Calendar 
                    editable
                    selectable
                    events={sessions}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                />
            </Card>

            <Dialog
                isOpen={isDialogOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
                width={600}
            >
                <h5 className="mb-4">{editingSession ? 'Edit Session' : 'Create New Session'}</h5>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSessionSubmit}
                >
                    {({ values, touched, errors, setValues }) => (
                        <Form>
                            <FormContainer>
                                <FormItem
                                    label="Session Title"
                                    invalid={errors.title && touched.title}
                                    errorMessage={errors.title as string}
                                >
                                    <Field
                                        type="text"
                                        name="title"
                                        placeholder="Enter session title"
                                        component={Input}
                                    />
                                </FormItem>
                                
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h6>Exercises</h6>
                                        <Button 
                                            size="sm" 
                                            variant="twoTone" 
                                            icon={<HiPlus />}
                                            onClick={() => addExercise(values, setValues)}
                                        >
                                            Add Exercise
                                        </Button>
                                    </div>
                                    
                                    {values.exercises.map((exercise, index) => (
                                        <Card key={exercise.id} className="mb-4 border border-gray-200 dark:border-gray-600">
                                            <div className="flex justify-between items-center mb-2">
                                                <h6>Exercise {index + 1}</h6>
                                                {values.exercises.length > 1 && (
                                                    <Button 
                                                        size="sm" 
                                                        variant="plain" 
                                                        onClick={() => removeExercise(index, values, setValues)}
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                            
                                            <FormItem
                                                label="Exercise Title"
                                                invalid={
                                                    errors.exercises?.[index]?.title && 
                                                    touched.exercises?.[index]?.title
                                                }
                                                errorMessage={
                                                    errors.exercises?.[index]?.title as string
                                                }
                                            >
                                                <Field
                                                    type="text"
                                                    name={`exercises.${index}.title`}
                                                    placeholder="Exercise name"
                                                    component={Input}
                                                />
                                            </FormItem>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormItem
                                                    label="Sets"
                                                    invalid={
                                                        errors.exercises?.[index]?.sets && 
                                                        touched.exercises?.[index]?.sets
                                                    }
                                                    errorMessage={
                                                        errors.exercises?.[index]?.sets as string
                                                    }
                                                >
                                                    <Field
                                                        type="text"
                                                        name={`exercises.${index}.sets`}
                                                        placeholder="Number of sets"
                                                        component={Input}
                                                    />
                                                </FormItem>
                                                
                                                <FormItem
                                                    label="Reps"
                                                    invalid={
                                                        errors.exercises?.[index]?.reps && 
                                                        touched.exercises?.[index]?.reps
                                                    }
                                                    errorMessage={
                                                        errors.exercises?.[index]?.reps as string
                                                    }
                                                >
                                                    <Field
                                                        type="text"
                                                        name={`exercises.${index}.reps`}
                                                        placeholder="Number of reps"
                                                        component={Input}
                                                    />
                                                </FormItem>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormItem
                                                    label="Weight"
                                                >
                                                    <Field
                                                        type="text"
                                                        name={`exercises.${index}.weight`}
                                                        placeholder="Weight (kg/lbs)"
                                                        component={Input}
                                                    />
                                                </FormItem>
                                                
                                                <FormItem
                                                    label="Rest"
                                                >
                                                    <Field
                                                        type="text"
                                                        name={`exercises.${index}.rest`}
                                                        placeholder="Rest time (seconds)"
                                                        component={Input}
                                                    />
                                                </FormItem>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                                
                                <div className="text-right mt-6">
                                    <Button
                                        className="ltr:mr-2 rtl:ml-2"
                                        type="button"
                                        onClick={handleDialogClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant="solid" type="submit">
                                        {editingSession ? 'Update' : 'Create'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </Container>
    )
}

export default ProgramCalendar