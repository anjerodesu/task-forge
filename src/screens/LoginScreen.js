import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import * as SecureStore from 'expo-secure-store';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        const usersData = await SecureStore.getItemAsync('users')
        const users = JSON.parse(usersData) || []
        const user = users.find(user => user.username === username && user.password === password)

        if (user) {
            await SecureStore.setItemAsync('currentUser', JSON.stringify(user))
            navigation.navigate('TodoList')
        } else {
            alert('Invalid username or password')
        }
    }

    return (
        <View>
            <Text>Login</Text>
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
            <Button
                title="Login"
                onPress={handleLogin}
            />
            <Button
                title="Register"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    )
}

export default LoginScreen