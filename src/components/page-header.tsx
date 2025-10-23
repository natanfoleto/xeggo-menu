import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface PageHeaderProps {
  title: string
}

export function PageHeader({ title }: PageHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="relative flex items-center justify-center border-b p-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4"
        aria-label="Voltar"
      >
        <ArrowLeft className="size-5" />
      </button>

      <h1 className="font-medium">{title}</h1>
    </div>
  )
}
