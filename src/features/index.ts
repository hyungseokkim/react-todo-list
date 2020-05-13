import {
    combineReducers,
    createAction,
    createSelector,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
//addTodos 액션함수를 만들기위해 reduxjs/tolkit이 필요
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

/*
todoSlice.reducer를 아까 맨 처음 만들어준 rootReducers에 넣으면 이제 자동으로 reducer 함수들이 연결된다.
*/
const reducers = {
    add: ({ list }: TodoList, { payload: { text, isDone } }: PayloadAction<Todo>) => {
        const newTodo: Todo = {
            id: generateRandomStr(5),
            text: text.toString(),
            isDone
        };

        list.push(newTodo);//list에 새로운 Todo데이터 삽입 
    },
};

/*
    createSlice Reducer 생성
    
-reducers는 각 action type별로 바뀔 상태값을 정의할 reducer 객체들을 말한다.
-initialState는 말 그대로 초기 상태 값이다.
-name은 아까 위에서 정의한 actionPrefix 값이 들어가는데, 자동으로 action Type이 생성될 때 actionPrefix를 prefix로 사용하여 만들어진다. 
즉, reducers 객체에 add라는 속성이 존재하면, 자동으로 `${actionPrefix}/add`('TODOS/add')라는 actionType이 생성된다.
-extraReducers는 자동으로 actionType과 actionCreator가 생성되지 않는 reducer가 생성되며, 
함수 내부에서 자동 생성되는 actionType이 아닌 사용자가 별도의 actionType을 사용할 수 있다. 이 속성은 꼭 사용하지 않아도 된다.


출처: https://im-developer.tistory.com/185 [Code Playground]
*/
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