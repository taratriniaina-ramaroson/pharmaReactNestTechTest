import { useState } from 'react'
import type {CreateMedicineDto} from '../types/medicine'

interface Props {
    onSubmit: (data: CreateMedicineDto) => void
}

export function MedicineForm({ onSubmit }: Props) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)

    function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault()

        if (!name || price <= 0 || stock < 0) return

        onSubmit({ name, price, stock })

        setName('')
        setPrice(0)
        setStock(0)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add medicine</h3>

            <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />

            <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
            />

            <button type="submit">Add</button>
        </form>
    )
}
