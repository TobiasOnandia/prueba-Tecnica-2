import { useState, use, Suspense, useDeferredValue } from 'react'
import styles from '../styles.module.css'

export function RenderProducts () {
  const [search, setSearch] = useState('')
  const deferredValue = useDeferredValue(search)

  const useFetch = () => {
    if (!search) return Promise.resolve()

    return fetch(`http://localhost:3000/api/items?q=${deferredValue}`)
      .then(res => {
        if (res.ok) return res.json()
        return { error: true, message: ` No se a encontrado resultados de : ${deferredValue}` }
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

// eslint-disable-next-line react/prop-types
function ShowProducts ({ fetchProducts }) {
  const products = use(fetchProducts)

  if (products?.error) {
    return <p>Error : {products.message}</p>
  }

  if (!products) return null

  return (
    <div>
      Resultado:
      {
        products.map(item => {
          return (
            <article key={item.id}>
              <h3>{item.title}</h3>
              <p className={styles.p}>{item.description}</p>
              <a href={`/api/items/${item.id}`}>
                Ir al detalle del producto
              </a>
            </article>
          )
        })
      }
    </div>
  )
}
