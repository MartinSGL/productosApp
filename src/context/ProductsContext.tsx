import { createContext, useEffect, useState } from "react";
import { Producto, ProductsResponse } from "../interfaces/appInterfaces";
import cafeApi from '../api/cafeApi';
import { ImagePickerResponse } from "react-native-image-picker";

type ProductsContextProps = {
    products: Producto []
    loadProducts: () => Promise<void>
    addProduct: ( categoryId:string, productName:string ) => Promise<Producto>
    updateProduct: ( categoryId:string, productName:string, productId:string ) => Promise<void>
    deleteProduct: ( productId:string ) => Promise<void>
    loadProductById: ( productId:string ) => Promise<Producto>
    uploadImage: ( data:any, id:string ) => Promise<void> 
}

export const ProductsContext = createContext({} as ProductsContextProps)

export const ProductsProvider = ({children}:any) => {

    const [products, setProducts ] = useState<Producto[]>([])

    useEffect(() => {
        loadProducts()
    }, [])
    

    const loadProducts = async () => {
        const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50')
        setProducts([...resp.data.productos])
        console.log(resp.data.productos)
    }

    const addProduct = async ( categoryId:string, productName:string ) => {
        
            const resp = await cafeApi.post<Producto>('/productos',{
                nombre:productName,
                categoria:categoryId
            })

            setProducts([...products,resp.data])

            return resp.data
        
    }

    const updateProduct = async ( categoryId:string, productName:string, productId:string ) => {
        try {
            const resp = await cafeApi.put<Producto>(`/productos/${productId}`,{
                nombre:productName,
                categoria:categoryId
            })

            setProducts( products.map( prod =>
                prod._id === productId 
                    ? resp.data
                    : prod
            ))
            
        } catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async ( productId:string ) => {}

    const loadProductById = async ( productId:string ) => { 
        const resp = await cafeApi.get<Producto>(`/productos/${productId}`)
        return resp.data

    }

    const uploadImage = async ( data:ImagePickerResponse, productId:string ) => {

        if(!data.assets) return

        const fileToUpload = {
            uri: data.assets[0].uri,
            type: data.assets[0].type,
            name: data.assets[0].fileName
        }

        const formData = new FormData()
        formData.append('archivo', fileToUpload)

        try {
            const resp = await cafeApi.put(`/uploads/productos/${productId}`, formData,{
                headers: { 'Content-Type': 'multipart/form-data' }
            })
        } catch (error) {
            console.log(error)
        }
     
        
        
    }

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage,

        }}>
            {children}
        </ProductsContext.Provider>
    )
}