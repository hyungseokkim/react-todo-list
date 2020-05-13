import React, { useState, useCallback, ChangeEvent, KeyboardEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodoList, actions, RootState, Todo } from '../features';
import './App.css';

/*
useDispatch를 실행하여 dispatch함수를 만들어주고,
input에 텍스트를 쓰고 엔터를 쳤을때, action의 addTodos를 dispatch한다.

이때 넣어줄 payload에는 input의 value값을 넣어주고,
isDone은 초기값 false를 넣어준다.
*/
const TodoEditor = () => {
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState<string>('');

    const handleText = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    },[]);

    const handleEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if(inputText && e.keyCode === 13){
            dispatch(actions.addTodos({
                text: inputText,
                isDone: false
            }));
            setInputText('');
        }
    }, [dispatch, inputText]);

    return(
      <div>
          <input
            type='text' 
            onChange={handleText}
            onKeyDown={handleEnter}
            value={inputText}
            className='txt-input'
            placeholder='write someThing here...'
          />
      </div>  
    );
};

/*
TodoList는 useSelector 함수를 사용하여 store에 저장된 state값을 가져오는데,
이 때 아까 만들어둔 selectTodoList를 이용하여 state의 list를 바로 가져온다. 
*/
const TodoList = () => {
    const dispatch = useDispatch();
    const todoList = useSelector<RootState, Todo[]>(state => selectTodoList(state.todos));

    return (
        <ul>
            {todoList.map((item: Todo) => (
                <li key={ item.id }>
                    <span className={item.isDone? 'txt-complete':''}>
                        {item.text}
                    </span>
                </li>
            ))}
        </ul>
    );
};

const App = () => {
    return (
        <div className='container'>
            <h1 className='title'>Todo List</h1>
            <TodoEditor/>
            <TodoList/>
        </div>
    ); 
}

export default App;

