import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProductsContext } from '../context/ProductsContext';
import useProductContext from '../hooks/useProductContext';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'>{}

const ProductsScreen = ( {navigation}:Props ) => {

    const {products, loadProducts} = useProductContext()
    const {logOut} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{marginRight:10}}
                    onPress={()=> navigation.navigate('ProductScreen',{})}
                >
                    <Text>Agregar</Text>
                </TouchableOpacity>
            ),
            headerLeft:()=> (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{marginLeft:10, backgroundColor:'red', padding:10, borderRadius:10}}
                    onPress={logOut}
                >
                    <Text>Salir</Text>
                </TouchableOpacity>
            )
        })
    })

    const loadProductsFromBackEnd = async () => {
        setLoading(true)
        await loadProducts()
        setLoading(false)
    }

    return (
        <View
            style={{flex:1,marginHorizontal:10}}
        >
            <FlatList
                data={products}
                keyExtractor={ p=> p._id }
                renderItem={({item})=>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={ ()=> navigation.navigate('ProductScreen',
                            {
                                id:item._id,
                                name:item.nombre
                            }
                        )}
                    >
                        <Text style={styles.productName}>{item.nombre}</Text>
                    </TouchableOpacity>
                }

                ItemSeparatorComponent={ () =>
                    <View style={styles.itemSeparator} />
                }

                refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      onRefresh={loadProductsFromBackEnd}
                    />
                  }
            />
        </View>
    )
}

export default ProductsScreen

const styles = StyleSheet.create({
    productName: {
        fontSize:20,
    },
    itemSeparator:{
        borderBottomWidth:2,
        marginVertical:5,
        borderBottomColor:'rgba(0,0,0,0.1)'
    }
});