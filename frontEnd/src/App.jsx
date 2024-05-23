import './App.css'
import { RenderProducts } from './Components/RenderProducts'
import styles from './styles.module.css'

function App () {
  return (
    <>

      <div className={styles.layout}>
        <h1>Bazar Online</h1>
        <RenderProducts />
      </div>
    </>
  )
}

export default App
