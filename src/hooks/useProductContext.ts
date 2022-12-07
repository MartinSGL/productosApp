import React, { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext';

const useProductContext = () => {

  const context = useContext(ProductsContext)

  if(context===undefined){
    throw new Error("useUserContext was used outside of its Provider")
  }

  return {
      ...context
  }
}

export default useProductContext