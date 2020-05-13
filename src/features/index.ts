import {
    combineReducers,
    createAction,
    createSelector,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import { generate as generateRandomStr } from 'randomstring';

/* Todo와 TodoList의 인터페이스 정의 */
export interface Todo{
    id: string;
    text: string;
    isDone : boolean;
}
//TodoList는 Todo가 들어간 배열과 list속성이 들어있음
export interface TodoList {
    list: Todo[];
}

const initialState: TodoList = {
    list: [],
}

const actionPrefix = "TODOS";
//state가 업데이트되면 list배열에 하나씩 새로운 todo 추가되도록 함.
/**
 * addTodos함수를 실행하면 아래와 같은 모양의 객체가 리턴됨.
 addTodos({
    id: 'abc1',
    text: 'hello',
    }); 
//{ types: 'TODOS/add', payload: { id: 'abc1', text: 'hello' }}
 */

const addTodos = createAction<object>(`${actionPrefix}/add`);

const reducers = {
    add: ({ list }: TodoList, { payload: { text, isDone } }: PayloadAction<Todo>) => {
        const newTodo: Todo = {
            id: generateRandomStr(5),
            text: text.toString(),
            isDone
        };

        list.push(newTodo);
    },
};

const todoSlice = createSlice({
    reducers,
    initialState,
    name: actionPrefix,
});

export const selectTodoList = createSelector(
    (state: TodoList) => state.list,
    (list: Todo[]) => list,
);

export const actions = {
    addTodos,
};

export const rootReducer = combineReducers({
    todos: todoSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>