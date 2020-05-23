/* globals Vue */


// app Vue instance
var app = new Vue({
  
  el: '#app',
  
  // app initial state
  data: {
    todos: [],
    newTodo: '',
    editedTodo: null,
    visibility: 'all'
  },

  filters: {
    pluralize: function (n) {
      return n === 1 ? 'item' : 'items'
    }
  },

  // methods that implement data logic.
  methods: {
    addTodo: function () {
      var value = this.newTodo && this.newTodo.trim()
      if (!value) {
        // todo is empty, nothing to do
        return
      }
      
      // get next todo ID
      var id = 1;
      for (var i = 0; i < this.todos.length; i++) {
        if (this.todos[i].id > id) {
          id = this.todos[i].id;
        }
      }
      
      // add new ToDo to the array
      this.todos.push({
        id: id + 1,
        title: value,
        completed: false
      });
      
      // clear out the newTodo variable
      this.newTodo = ''
    },

    removeTodo: function (todo) {
      // get the index (location) of the current todo
      var index = this.todos.indexOf(todo);
      
      // remove that index in the array
      this.todos.splice(index, 1);
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },

    cancelEdit: function (todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },

    removeCompleted: function () {
      
      var incompleteTodos =  this.todos.filter(function (todo) {
        return !todo.completed;
      })
      
      this.todos = incompleteTodos;
    }
  },

   // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    remaining: function () {
      
      var incompleteTodos = this.todos.filter(function (todo) {
        return !todo.completed;
      });
      
      return incompleteTodos.length
    }
  }
})

