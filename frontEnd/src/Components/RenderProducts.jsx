import { useState, use, Suspense } from 'react'

import styles from '../styles.module.css'

export function RenderProducts () {
  const [search, setSearch] = useState('')

  const useFetch = () => {
    if (!search) return Promise.resolve()

    return fetch(`http://localhost:3000/api/items?q=${search}`)
      .then(res => {
        console.log(res)
        if (res.ok) return res.json()

        return { error: true, message: ` No se a encontrado resultados de : ${search}` }
      })
  }

  return (
    <article>
      <form action='' className={styles.form}>
        <input
          type='text'
          placeholder='Ej.Iphone'
          onChange={(event) => { setSearch(event.target.value) }}
        />
        <button>Buscar</button>
      </form>

      <Suspense fallback='...cargando'>
        <ShowProducts fetchProducts={useFetch()} />
      </Suspense>
    </article>
  )
}

// eslint-disable-next-line react/prop-types
function ShowProducts ({ fetchProducts }) {
  const products = use(fetchProducts)
  console.log(products)

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
              <p>{item.description}</p>
            </article>
          )
        })
      }
    </div>
  )
}
