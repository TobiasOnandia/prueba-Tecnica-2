import { use } from 'react'
import styles from '../styles.module.css'

export function ShowProducts ({ fetchProducts }) {
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
