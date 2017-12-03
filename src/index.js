import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Redux, { createStore } from 'redux';
import deepFreeze from 'deep-freeze';
import expect from 'expect';




const todo = (state, action) => {
    // console.log('todo reducer');
    // console.log('state ', state);
    // console.log('action: ', action);
switch(action.type){
    case 'ADD_TODO':
    return {
        id: action.id,
        text: action.text,
        completed: false
    }

    case 'TOGGLE_TODO':
        // debugger;
        if(state.id != action.id) {
            return state;
        }
        // debugger;
        return {
            
            ...state,
            completed: !state.completed
        };

    
}
};

const todos = (state = [], action) => {
    let newState;
    switch(action.type) {
        case 'ADD_TODO':
            // debugger;
            newState = [
                // returns state with new elemnt attached
                ...state,
                todo(undefined, action)
            ];
            // console.log('todos, ADD_TODO, newState: ', newState);
            return newState;                                                                                                                                   
        case 'TOGGLE_TODO':
        // debugger;
        newState = state.map(t => {
            return todo(t, action);
        });
        // console.log('todos, ADD_TODO, newState: ', newState);
        return newState;
        
        default:
            return state;
    }
};

const visibilityFilter = (
    state = 'SHOW_ALL',
    action
) => {
    
    switch(action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

const combineReducers = (reducers) => {

    console.log(Object.keys(reducers));
    console.log(Object.keys(reducers).reduce);

    let callbackCounter = 0;

    return ( state = {}, action ) => {
        console.log('state: ', state);
        console.log('action: ', action);
        //reduce( callback(), initial value)
        let reduceCallback = (nextState, key) => { //accumulator,  current value
            debugger;
            callbackCounter++;

            console.log(`callback called ${ callbackCounter }, nextState: `, nextState);

            nextState[key] = reducers[key]( state[key], action );

            return nextState;
            // reducers['todos']
        }

        // 1. {}, todos'
        //2. { todos: '}
        return Object.keys(reducers).reduce(reduceCallback, {});
    };
};

const todoApp = combineReducers( {
    todos,
    visibilityFilter
})
 
// const todoApp = (state = {}, action) => {
//     const todosState = todos(state.todos, action);
//     const visibilityFilterState = visibilityFilter(state.visibilityFilter,action);
//     debugger;
//     return { 
//         todos:todosState, 
//         visibilityFilter: visibilityFilterState
//     }
// }

const store = createStore(todoApp);

const testAddTodo = () => {
    const stateBefore = [];
    const action  = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
        id: 0,
        text: 'Learn Redux',
        completed: false
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: false
        }
    ];

    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    }

    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go shopping',
            completed: true
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(
        stateAfter
    );
};

// testAddTodo();
testToggleTodo();
console.log('The test has passed');

// const store = createStore(todos);

console.log('Initial state:');
console.log(store.getState());
console.log('--------------');

console.log('dispatching ADD_TODO');
store.dispatch({
                type: 'ADD_TODO',
                id: 0,
                text: 'Learn Redux'
                });

console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('dispatching ADD_TODO');
store.dispatch({
                type: 'ADD_TODO',
                id: 1,
                text: 'Go shopping'
                });

console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('dispatching TOGGLE_TODO');
store.dispatch({
                type: 'TOGGLE_TODO',
                id: 0
                });

console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching SET_VISIBILITY_FILTER');
store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: 'SHOW_COMPLETED'
});

console.log('Current state:');
console.log(store.getState());
console.log('--------------');