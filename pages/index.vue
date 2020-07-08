<template>
  <div class="container">
    <h1>Todo App</h1>
    <form @submit.prevent="addTodo" class="horizontal todo-form">
      <input type="checkbox" v-model="check" name="check" class="form-check" />
      <input type="text" v-model="todo" name="todo"  class="form-todo" placeholder="todoを入力..."/>
      <input type="submit" name="submit" class="form-submit" value="保存" />
    </form>
    <div class="kanban">
      <div class="board">
        <h2 class="board-title">active todos</h2>
        <ul class="todo-list">
          <li v-for="todoObj in activeTodos" :key="todoObj.id">
            <TodoItem :id="todoObj.id" :todo="todoObj.todo" :completed="todoObj.completed" :completedAt="todoObj.completedAt" @toggle="toggleComplete" />
          </li>
        </ul>
      </div>
      <div class="board">
        <h2 class="board-title">completed todos</h2>
        <ul class="todo-list">
          <li v-for="todoObj in completedTodos" :key="todoObj.id">
            <TodoItem :id="todoObj.id" :todo="todoObj.todo" :completed="todoObj.completed" :completedAt="todoObj.completedAt" @toggle="toggleComplete" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem'
export default {
  components: {
    TodoItem
  },
  data() {
    return {
      check: false,
      todo: "",
      todos: [
        {id: 1, todo: 'コンビニでジュースを買う', completed: false, completedAt: null},
        {id: 2, todo: '書店で資格の本を買う', completed: true, completedAt: new Date('2020/01/01')},
        {id: 3, todo: '新しい料理を覚える', completed: true, completedAt: new Date()},
      ]
    }
  },
  computed: {
    activeTodos() {
      return this.todos.filter(todoObj => !todoObj.completed)
    },
    completedTodos() {
      return this.todos.filter(todoObj => todoObj.completed)
    }
  },
  methods: {
    addTodo() {
      const maxId = Math.max(...this.todos.map(todo => todo.id));
      const todo = {id: maxId + 1, todo: this.todo, completed: this.check, completedAt: this.check ? new Date() : null}
      this.todos.push(todo)
      this.todo = ""
      this.check = false
    },
    toggleComplete(id) {
      const todo = this.todos.find(todoObj => todoObj.id === id)
      todo.completed = !todo.completed
      todo.completedAt = todo.completed ? new Date() : null
      console.log('更新しました')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 1000px;
  min-height: 100vh;
  background-color: #ddd;
  overflow: hidden;
}
h1 {
  padding: 15px 0;
  text-align: center;
}
.horizontal {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.todo-form {
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.4);
  margin: 15px 0;
  padding: 15px;
  .form-check { 
    width: 29px;
    height: 29px;
    margin-right: 10px;
  }
  .form-todo {
    font-size: 20px;
    margin-right: 10px;
  }
  .form-submit {
    font-size: 15px;
  }
}
.kanban {
  display: flex;
  flex-direction: row;
  .board {
    width: 50%;
    .board-title {
      text-align: center;
      font-size: 0.8em;
      margin: 15px;
    }
    .todo-list {
      margin: 15px;
    }
    .completed {
      text-decoration: line-through;
    }
  }
}
</style>
