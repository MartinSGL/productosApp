import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import { ProductsStackParams } from '../navigator/ProductsNavigator'
import useCategories from '../hooks/useCategories';
import { useForm } from '../hooks/useForm'
import useProductContext from '../hooks/useProductContext'


interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

const ProductScreen = ({route,navigation}:Props) => {

  const {id = '',name=''} = route.params

  const [tempUri, setTempUri] = useState<string>()

  const {categories,isLoading} = useCategories()

  const {loadProductById,addProduct,updateProduct,uploadImage} = useProductContext()

  const {_id,categoriaId,nombre,img,form,onChange,setFormValue} =  useForm({
    _id:id,
    categoriaId:'',
    nombre:name,
    img:''
  })

  useEffect(()=>{
    navigation.setOptions({
      title: (nombre) ? nombre :'Sin nombre del producto'
    })
  },[nombre])

  useEffect(()=>{
    loadProduct()
  },[])

  const loadProduct = async () => {
    if(id.length===0) return
    const product = await loadProductById(id)
    setFormValue({
      _id:id,
      categoriaId:product.categoria._id,
      img: product.img ?? '',
      nombre
    })
  }

  const saveOrUpdate = async () => {
    if(id.length>0){
      updateProduct(categoriaId,nombre,id)
    }else{
      const tempCategoriaId = categoriaId || categories[0]._id
      const newProduct = await addProduct(tempCategoriaId,nombre)
      onChange(newProduct._id,'_id')
    }
  }

  const takePhoto = () => {
    launchCamera({
      mediaType:'photo',
      quality:0.5
    },(resp)=>{
      if (resp.didCancel) return
      if ( !resp.assets ) return

      setTempUri(resp.assets[0].uri)
      uploadImage(resp,_id)
    })
  }

  const takePhotoFromGallery = () => {
    launchImageLibrary({
      mediaType:'photo',
      quality:0.5
    },(resp)=>{
      if (resp.didCancel) return
      if ( !resp.assets ) return

      setTempUri(resp.assets[0].uri)
      uploadImage(resp,_id)
    })
  }

  if(isLoading) {
    return (
      <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      }}>
        <ActivityIndicator
          color="blue"
          size="large"
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
        <ScrollView>
          <Text style={styles.label}>Nombre del Producto: </Text>
          <TextInput 
            placeholder='Producto'
            style={styles.textInput}
            value={nombre}
            onChangeText={(value) =>  onChange(value,'nombre')}
          />

        <Text style={styles.label}>Categoria: </Text>

        <Picker
          selectedValue={categoriaId}
          onValueChange={(itemValue) =>
            onChange( itemValue , 'categoriaId' )
          }>
            {
              categories?.map(el=>
                 <Picker.Item key={el._id} label={el.nombre} value={el._id} />
              )
            }
        </Picker>

        <Button 
            title='Guardar'
            onPress={saveOrUpdate}
            color="#5856D6"
          />
        {

          (_id.length>0) &&  
          <View style={{flexDirection:'row', justifyContent:'center', marginTop:10}}>

            <Button 
              title='Camara'
              onPress={takePhoto}
              color="#5856D6"
            />

            <Button 
              title='Galería'
              onPress={takePhotoFromGallery}
              color="#5856D6"
            />
          </View>
        }

      

        { img.length > 0 && !tempUri &&
          <Image 
            source={{uri: img}}
            style={{
              width:'100%',
              height:300,
              marginTop:20
            }}
          />
        }

        {/* imagen temporal */}
        { tempUri &&
          <Image 
            source={{uri: tempUri}}
            style={{
              width:'100%',
              height:300,
              marginTop:20
            }}
          />
        }
        </ScrollView>
    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
    container:{
      flex:1,
      marginTop:10,
      marginHorizontal:20
    },
    label:{
      fontSize:18,
      marginTop:10
    },
    textInput:{
      borderWidth:1,
      paddingHorizontal:10,
      paddingVertical:8,
      borderRadius:10,
      marginVertical:10,
      borderColor:'rgba(0,0,0,0.2)',
      height:45
    }
});