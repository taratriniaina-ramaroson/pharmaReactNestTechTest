import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchMedicines, createMedicine } from '../api/medicines'
import { MedicineForm } from '../components/MedicineForm'

export function MedicinesPage() {
    const queryClient = useQueryClient()

    const { data, isLoading, error } = useQuery({
        queryKey: ['medicines'],
        queryFn: fetchMedicines,
    })

    const mutation = useMutation({
        mutationFn: createMedicine,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicines'] })
        },
    })

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading medicines</p>

    return (
        <div>
            <MedicineForm onSubmit={mutation.mutate} />

            <table className="w-full mt-4 border-collapse table">
                {data?.map((m) => (
                    <tr key={m.id} className="table-row-group hover:bg-slate-700 cursor-pointer">
                        <td className='table-cell text-left pl-4'>{m.name}</td>
                        <td className='table-cell'>{m.price} €</td>
                        <td className='table-cell'>{m.stock}</td>
                        <td className='table-cell gap-2'>
                            <a href="#">Edit</a>
                            <a href="#" className="text-red-500 ml-2">Delete</a>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}
