import React, { Dispatch, useContext } from 'react'
import { IGlobalState, initialSate } from './state'

/**
 * 定义Action
 */
export interface IAction {
  type: string
  payload?: any
}

export const StoreContext = React.createContext<[IGlobalState, Dispatch<any>]>([
  initialSate,
  () => {},
])

export function useGlobalState(): IGlobalState {
  const [state] = useContext(StoreContext)
  return state
}

export function useDispatch(): Dispatch<IAction> {
  const [, disaptch] = useContext(StoreContext)
  return disaptch
}
