interface Props {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export function Modal({ isOpen, onClose, children }: Props) {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-[#242424] rounded-lg p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}