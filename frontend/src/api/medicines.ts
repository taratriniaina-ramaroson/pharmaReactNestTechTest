import type { Medicine, CreateMedicineDto } from '../types/medicine'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export async function fetchMedicines(): Promise<Medicine[]> {
    const res = await fetch(`${API_URL}/medicines`)
    if (!res.ok) throw new Error('Failed to fetch medicines')
    return res.json()
}

export async function createMedicine(
    data: CreateMedicineDto,
): Promise<Medicine> {
    const res = await fetch(`${API_URL}/medicines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error('Failed to create medicine')
    return res.json()
}

export async function deleteMedicine(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/medicines/${id}`, {
        method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete medicine')
}
