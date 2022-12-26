import { useState } from 'react'

export default function cardData() {
    console.log('taking data')
    const [title, setTitle] = useState(null)
    const [point, setPoint] = useState(null)
    const [progress, setProgress] = useState(null)
    const [maxProgress, setMaxProgress] = useState(null)
    
    const [date, setDate] = useState(new Date())

    console.log('returning data: ' + title)
    return { title, setTitle, point, setPoint, progress, setProgress, maxProgress, setMaxProgress, date, setDate}
}