import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import WhiteLogo from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm'
import { loginStyles } from '../theme/loginTheme'
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{}

const RegisterScreen = ({navigation}:Props) => {


    const {errorMessage,signUp,removeError} = useContext(AuthContext)

    const {email,password,name,onChange} = useForm({
        name:'',
        email:'',
        password:''
    })

    useEffect(() => {
        if(errorMessage.length===0) return
        Alert.alert(
           'Registro incorrecto',
           errorMessage,
           [
               {
                   text:'Ok',
                   onPress: () => removeError()
               }
           ]
       )
       }, [errorMessage])

    const {  } = useContext(AuthContext)

    const onRegister = () => {
        Keyboard.dismiss()
        signUp({nombre:name,correo:email,password})
    }

    return (
        <>
        <KeyboardAvoidingView
            style={{flex:1, backgroundColor:'#5856D6'}}
            behavior={(Platform.OS==='ios') ? 'padding' : 'height'}
        > 
            <View style={loginStyles.formContainer}>
                <WhiteLogo />

                <Text style={ loginStyles.title }>Registro</Text>

                <Text style={ loginStyles.label }>Nombre</Text>
                <TextInput 
                    placeholder='Ingrese su nombre'
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    underlineColorAndroid="white"
                    style={[ 
                        loginStyles.inputField,
                        (Platform.OS === 'ios' && loginStyles.inputFieldIos) 
                    ]}
                    selectionColor="white"
                    autoCapitalize="words"
                    autoCorrect={false}

                    onChangeText={(value)=>onChange(value,'name')}
                    value={name}
                    onSubmitEditing={onRegister}
                />

                <Text style={ loginStyles.label }>Email</Text>
                <TextInput 
                    placeholder='Ingrese su email'
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType="email-address"
                    underlineColorAndroid="white"
                    style={[ 
                        loginStyles.inputField,
                        (Platform.OS === 'ios' && loginStyles.inputFieldIos) 
                    ]}
                    selectionColor="white"
                    autoCapitalize="none"
                    autoCorrect={false}

                    onChangeText={(value)=>onChange(value,'email')}
                    value={email}
                    onSubmitEditing={onRegister}
                />

                <Text style={ loginStyles.label }>Contraseña</Text>
                <TextInput 
                    placeholder='*******'
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    underlineColorAndroid="white"
                    secureTextEntry
                    style={[ 
                        loginStyles.inputField,
                        (Platform.OS === 'ios' && loginStyles.inputFieldIos) 
                    ]}
                    selectionColor="white"

                    onChangeText={(value)=>onChange(value,'password')}
                    value={password}
                    onSubmitEditing={onRegister}
                />

                <View style={loginStyles.bottomContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={loginStyles.button}
                        onPress={onRegister}
                    >
                        <Text style={loginStyles.buttonText} >Registrar</Text>
                    </TouchableOpacity>
                </View>

                
                <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=> navigation.replace('LoginScreen') } //documentar
                        style={loginStyles.buttonBack}
                    >
                    <Text style={loginStyles.buttonText} >Iniciar sesion</Text>
                </TouchableOpacity>
                

            </View>
        </KeyboardAvoidingView>
            
        </>
    )
}

export default RegisterScreen