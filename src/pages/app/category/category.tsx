import { useParams } from 'react-router-dom'

export function Category() {
  const { id, slug } = useParams<{ id: string; slug: string }>()

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Categoria</h1>
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <p>
        <strong>ID da categoria:</strong> {id}
      </p>
    </div>
  )
}
