import { useState } from 'react'
import { z } from 'zod'
import type { CreateMedicineDto } from '../types/medicine'

const medicineSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.number().positive('Price must be greater than 0'),
    stock: z.number().int().min(0, 'Stock must be 0 or more'),
})

type FormErrors = Partial<Record<keyof CreateMedicineDto, string>>

interface Props {
    onSubmit: (data: CreateMedicineDto) => void
}

export function MedicineForm({ onSubmit }: Props) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [errors, setErrors] = useState<FormErrors>({})

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const result = medicineSchema.safeParse({ name, price, stock })

        if (!result.success) {
            const fieldErrors: FormErrors = {}
            const flatErrors = result.error.flatten().fieldErrors
            fieldErrors.name = flatErrors.name?.join(',')
            fieldErrors.price = flatErrors.price?.join(',')
            fieldErrors.stock = flatErrors.stock?.join(',')
            setErrors(fieldErrors)
            return
        }

        setErrors({})
        onSubmit(result.data)

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
                    {errors.name && <span className="text-red-400 text-sm text-left">{errors.name}</span>}
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
                    {errors.price && <span className="text-red-400 text-sm text-left">{errors.price}</span>}
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
                    {errors.stock && <span className="text-red-400 text-sm text-left">{errors.stock}</span>}
                </div>

                <button type="submit">Add</button>
            </div>
        </form>
    )
}
