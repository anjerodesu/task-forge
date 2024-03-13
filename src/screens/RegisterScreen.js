import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import uuid from 'react-native-uuid'

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async () => {
        const usersData = await SecureStore.getItemAsync('users')
        const users = JSON.parse(usersData) || []
        const isUserExist = users.some(user => user.username === username)
        console.log('isUserExist', isUserExist)

        if (!isUserExist) {
            if (password.length > 6) {
                const newUser = { uuid: uuid.v4(), username, password }
                users.push(newUser)
                await SecureStore.setItemAsync('users', JSON.stringify(users))
                await SecureStore.setItemAsync('currentUser', JSON.stringify(newUser))
                navigation.navigate('Login')
            } else {
                alert('Password must be at least 6 characters long')
            }
        } else {
            alert('Username already exists')
        }
    }

    return (
        <View>
            <Text>RegisterScreen</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                keyboardType="visible-password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
            />
            <Button title="Register" onPress={handleRegister} />
        </View>
    )
}

export default RegisterScreen
