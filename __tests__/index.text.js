import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { addTodo } from '../src/actions'
import { ADD_TODO } from '../src/actions/types'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

describe('addTodo action', () => {
    it('should add a todo', async () => {
        const store = mockStore([])
        const todo = {
            title: '__tests__ title',
            description: '__tests__ description',
            priority: 1
        }

        const SecureStore = {
            getItemAsync: jest.fn().mockResolvedValue('[]'),
            setItemAsync: jest.fn().mockResolvedValue()
        }
        jest.mock('expo-secure-store', () => SecureStore)

        await store.dispatch(addTodo(todo.title, todo.description, todo.priority))
        expect(store.getActions()).toEqual([
            {
                type: ADD_TODO,
                payload: {
                    id: expect.any(Number),
                    title: '__tests__ title',
                    description: '__tests__ description',
                    priority: 1,
                    completed: false
                }
            }
        ])
        expect(SecureStore.setItemAsync).toHaveBeenCalledWith('[]', JSON.stringify([
            {
                id: expect.any(Number),
                title: '__tests__ title',
                description: '__tests__ description',
                priority: 1,
                completed: false
            }
        ]))
    })
})

