/*
 *  A simple todo list app.
 *
 * @author YOUR NAMES HERE
 */

// visibility filters
var filters = {
    all: function (todos) {
        return todos;
    },
    active: function (todos) {
        return todos.filter(todo => !todo.completed);
    },
    completed: function (todos) {
        return todos.filter(todo => todo.completed);
    }
}

// Define custom filter to correctly pluralize the word
Vue.filter('pluralize', function (n) {
    return n === 1 ? 'item' : 'items';
});

// Example data that represents the list of todo items
var todoList = [
    {
        title: 'Download code',
        completed: true
    },
    {
        title: 'Study code',
        completed: true
    },
    {
        title: 'Finish code',
        completed: true
    }
];

// app Vue instance
var app = new Vue({
    // app initial state
    data: {
        todos: [],
        newTodo: '',
        visibility: 'all'
    },

    computed: {
        // return todos that match the currently selected filter
        filteredTodos () {
            return filters[this.visibility](this.todos);
        },

        // return count of the remaining active todo items
        remaining () {
            return filters.active(this.todos).length;
        }
    },

    methods: {
        // change current filter to the given value
        setFilter (filter) {
            this.visibility = filter;
        },

        // add newly entered todo item if it exists and clear it to prepare for the next one
        addTodo () {
            this.newTodo = this.newTodo.trim();
            if (this.newTodo) {
                this.todos.push({
                    title: this.newTodo,
                    completed: false
                })
                // text input displays this value, so clear it to indicate ready to type a new one
                this.newTodo = '';
            }
        },

        // remove given todo from the list
        removeTodo (todo) {
            this.todos.splice(this.todos.indexOf(todo), 1)
        },

        // remove all completed todos from the list
        removeCompleted () {
            this.todos = filters.active(this.todos)
        }
    }
})

// mount
app.$mount('#todoapp')
