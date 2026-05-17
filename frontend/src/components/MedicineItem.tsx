import { useState } from 'react'
import type { Medicine, CreateMedicineDto } from '../types/medicine'
import { Modal } from './Modal'
import { MedicineForm } from './MedicineForm'

interface Props {
    medicine: Medicine
    onUpdate: (id: number, data: CreateMedicineDto) => void
    onDelete: (id: number) => void
}

export function MedicineItem({ medicine, onUpdate, onDelete }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleDelete() {
        if (!window.confirm('This action will delete this medicine, do you confirm ?')) return
        onDelete(medicine.id)
    }

    function handleUpdate(data: CreateMedicineDto) {
        onUpdate(medicine.id, data)
        setIsModalOpen(false)
    }

    return (
        <>
            <tr className="hover:bg-slate-700 cursor-pointer">
                <td className="text-left pl-4 py-2">{medicine.name}</td>
                <td className="py-2">{medicine.price} €</td>
                <td className="py-2">{medicine.stock}</td>
                <td className="py-2 gap-2">
                    <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true) }}>
                        Edit
                    </a>
                    <a href="#" className="text-red-500 ml-2" onClick={(e) => { e.preventDefault(); handleDelete() }}>
                        Delete
                    </a>
                </td>
            </tr>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <MedicineForm initialValues={medicine} onSubmit={handleUpdate} />
            </Modal>
        </>
    )
}