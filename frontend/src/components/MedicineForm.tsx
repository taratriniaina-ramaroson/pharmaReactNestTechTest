import { useState } from 'react'
import type { CreateMedicineDto } from '../types/medicine'

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
        <form onSubmit={handleSubmit} className="p-4 border border-slate-100 rounded flex flex-col gap-2">
            <h3 className="text-xl text-left">Add medicine</h3>

            <div className="flex gap-2">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-left">Name</label>
                    <input
                        id="name"
                        className="border-b border-slate-100 px-1 py-2"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="price" className="text-left">Price</label>
                    <input
                        id="price"
                        className="text-right border-b border-slate-100 px-1 py-2"
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="stock" className="text-left">Stock</label>
                    <input
                        id="stock"
                        className="text-right border-b border-slate-100 px-1 py-2"
                        type="number"
                        placeholder="Stock"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                    />
                </div>

                <button type="submit">Add</button>
            </div>
        </form>
    )
}
