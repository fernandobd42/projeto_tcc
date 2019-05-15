import React, { useState, useContext, createContext } from 'react'

export const ContextAPI = createContext()
export const UserContextAPI = () => useContext(ContextAPI)
export const setToken = token => localStorage.setItem('TCC__TOKEN', token)
export const getToken = () => localStorage.getItem('TCC__TOKEN')

const StoreProvider = props => {
  const [user, setUser] = useState(undefined)

  return (
    <ContextAPI.Provider value={{user, setUser}}>
      {props.children}
    </ContextAPI.Provider>
  )
}

export default StoreProvider
