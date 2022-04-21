import { useReducer } from 'react'
import { reducer } from './store/reducer'
import { initialSate } from './store/state'
import { StoreContext } from './store'
import './style/index.scss'
import { Panel } from './components/Panel'

function App() {
  const [state, dispatch] = useReducer(reducer, initialSate)
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      <div className="app">
        <Panel></Panel>
      </div>
    </StoreContext.Provider>
  )
}

export default App
