import { useState, Suspense } from 'react'
import styles from '../styles.module.css'
import { ShowProducts } from './ShowProducts'

export function RenderProducts () {
  const [search, setSearch] = useState('')

  const useFetch = () => {
    if (!search) return Promise.resolve()

    return fetch(`http://localhost:3000/api/items?q=${search}`)
      .then(res => {
        if (res.ok) return res.json()
        return { error: true, message: ` No se a encontrado resultados de : ${search}` }
      })
  }

  return (
    <article>
      <form action='' onSubmit={(e) => { e.preventDefault() }} className={styles.form}>
        <input
          type='text'
          placeholder='Ej.Iphone'
          onChange={(event) => { setSearch(event.target.value) }}
        />
        <button>Buscar</button>
      </form>
      <Suspense fallback='Cargando...'>
        <ShowProducts fetchProducts={useFetch()} />
      </Suspense>
    </article>
  )
}
