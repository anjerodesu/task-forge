import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Button, TextInput } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, deleteTodo, setTodos, toggleTodo } from '../actions'
import * as SecureStore from 'expo-secure-store';

const TodoListScreen = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState(1) // 1 low, 2 medium, 3 high

    const [sort, setSort] = useState(0) // 0 unsorted, 1 ascending, 2 descending
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Low', value: 1 },
        { label: 'Medium', value: 2 },
        { label: 'High', value: 3 }
    ]);

    const [currentUser, setCurrentUser] = useState({})
    const todos = useSelector(state => state.todos)
    const [sortedTodos, setSortedTodos] = useState([])
    const dispatch = useDispatch()

    const [isUpdatingTodo, setUpdatingTodo] = useState(false)

    const saveTodos = () => {
        SecureStore.setItemAsync(`${currentUser.uuid}`, JSON.stringify(todos)).then(() => {
            alert('Todos has been updated successfully!')
        })
    }

    const handleAddTodo = () => {
        setUpdatingTodo(true)
        dispatch(addTodo(title, description, priority))
        setTitle('')
        setDescription('')
        setPriority(1)
    }

    const handleDeleteTodo = async id => {
        setUpdatingTodo(true)
        dispatch(deleteTodo(id))
    }

    const handleToggleTodo = async id => {
        setUpdatingTodo(true)
        dispatch(toggleTodo(id))
    }

    const handleSortByPriority = () => {
        switch (sort) {
            case 0:
                setSort(1)
                break
            case 1:
                setSort(2)
                break
            case 2:
                setSort(0)
                break
        }
    }

    const sortTodos = () => {
        switch (sort) {
            case 0:
                setSortedTodos(todos)
                break
            case 1:
                setSortedTodos([...todos].sort((a, b) => a.priority - b.priority))
                break
            case 2:
                setSortedTodos([...todos].sort((a, b) => b.priority - a.priority))
                break
        }
    }

    const displayPriorityValue = priority => {
        switch (priority) {
            case 1:
                return 'Low'
            case 2:
                return 'Medium'
            case 3:
                return 'High'
        }
    }

    const setSortButtonTitle = () => {
        switch (sort) {
            case 0:
                return 'Sort by priority'
            case 1:
                return 'Sort ascending'
            case 2:
                return 'Sort descending'
        }
    }

    useEffect(() => {
        const getCurrentUser = () => {
            SecureStore.getItemAsync('currentUser').then(currentUserData => {
                if (currentUserData) {
                    setCurrentUser(JSON.parse(currentUserData))
                }
            })
        }
        getCurrentUser()
    }, [])

    useEffect(() => {
        const fetchTodos = () => {
            SecureStore.getItemAsync(`${currentUser.uuid}`).then(todosData => {
                if (todosData) {
                    const parsedTodos = JSON.parse(todosData)
                    dispatch(setTodos(parsedTodos))
                }
            })
        }
        fetchTodos()
    }, [currentUser])

    useEffect(() => {
        if (isUpdatingTodo) {
            saveTodos()
            setUpdatingTodo(false)
        }

        sortTodos()
    }, [todos])

    useEffect(() => {
        sortTodos()
    }, [sort])

    return (
        <View>
            <TextInput
                placeholder="Title"
                value={ title }
                onChangeText={ text => setTitle(text) }
            />
            <TextInput
                placeholder="Description"
                value={ description }
                onChangeText={ text => setDescription(text) }
            />
            <DropDownPicker
                open={ open }
                value={ priority }
                items={ items }
                setOpen={ setOpen }
                setValue={ setPriority }
                setItems={ setItems }
            />
            <Button title="Add Todo" onPress={handleAddTodo} />
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
            <Text>Total Tasks: { todos.length } | Completed Tasks: { todos.filter(todo => todo.completed).length }</Text>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
            <Button title={ setSortButtonTitle() } onPress={ () => handleSortByPriority() } />
            <FlatList
                data={sortedTodos}
                keyExtractor={ item => item.id.toString() }
                renderItem={({ item }) => (
                    <View
                        key={ item.id }
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: '#ccc'
                        }}
                    >
                        <Text>{ item.title }</Text>
                        <Text>{ item.description }</Text>
                        <Text>{ displayPriorityValue(item.priority) }</Text>
                        <Button
                            title={ item.completed ? 'Undo' : 'Complete' }
                            onPress={ () => handleToggleTodo(item.id) }
                        />
                        <Button
                            title="Delete"
                            onPress={ () => handleDeleteTodo(item.id) }
                        />
                    </View>
                )}
            />
        </View>
    )
}

export default TodoListScreen
