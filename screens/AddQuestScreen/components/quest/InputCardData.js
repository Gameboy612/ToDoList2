import { useState } from 'react'

export default function cardData() {
    console.log('taking data')
    const [task, setTask] = useState(null)
    const [points, setPoints] = useState(null)
    const [progressCurrent, setProgressCurrent] = useState(null)
    const [progressMax, setProgressMax] = useState(null)
    
    const [date_DueDate, setDate_DueDate] = useState(new Date())
    const [date_FullDay, setDate_FullDay] = useState(false)

    return { task, setTask, points, setPoints, progressCurrent, setProgressCurrent, progressMax, setProgressMax, date_DueDate, setDate_DueDate, date_FullDay, setDate_FullDay }
}