import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchMedicines, createMedicine, updateMedicine, deleteMedicine } from '../api/medicines'
import { MedicineForm } from '../components/MedicineForm'
import { MedicineItem } from '../components/MedicineItem'
import type { CreateMedicineDto } from '../types/medicine'
import { toast } from 'sonner'

export function MedicinesPage() {
    const queryClient = useQueryClient()

    const { data, isLoading, error } = useQuery({
        queryKey: ['medicines'],
        queryFn: fetchMedicines,
    })

    const createMutation = useMutation({
        mutationFn: createMedicine,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicines'] })
        },
        onError: () => {
            toast.error('Failed to create medicine')
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: CreateMedicineDto }) => updateMedicine(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicines'] })
        },
        onError: () => {
            toast.error('Failed to update medicine')
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteMedicine,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicines'] })
        },
        onError: () => {
            toast.error('Failed to delete medicine')
        }
    })

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading medicines</p>

    return (
        <div>
            <MedicineForm onSubmit={createMutation.mutate} />

            <table className="w-full mt-4 border-collapse table">
                {data?.map((m) => (
                    <MedicineItem
                        key={m.id}
                        medicine={m}
                        onUpdate={(id, data) => updateMutation.mutate({ id, data })}
                        onDelete={deleteMutation.mutate}
                    />
                ))}
            </table>
        </div>
    )
}
