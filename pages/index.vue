<template>
  <div class="container mx-auto px-4">
    <h1 class="mt-4 text-center">Todo App</h1>
    <TodoForm />
    <div class="mt-4 grid gap-4 grid-cols-2">
      <div class="border border-gray-500 rounded-sm">
        <h2 class="m-3 text-center">Active todos</h2>
        <ul>
          <li v-for="taskObj in activeTodos" :key="taskObj.id" class="m-1 p-1 border rounded-sm border-gray-500 bg-gray-200 hover:bg-gray-100">
            <TodoItem :id="taskObj.id" :title="taskObj.title" :completed="taskObj.completed" :completedAt="taskObj.completedAt" @toggle="toggleComplete" @dismiss="removeTask" />
          </li>
        </ul>
      </div>
      <div class="border border-gray-500 rounded-sm">
        <h2 class="my-3 text-center">Completed todos</h2>
        <ul>
          <li v-for="taskObj in completedTodos" :key="taskObj.id" class="m-1 p-1 border rounded-sm border-gray-500 bg-gray-200 hover:bg-gray-100">
            <TodoItem :id="taskObj.id" :title="taskObj.title" :completed="taskObj.completed" :completedAt="taskObj.completedAt" @toggle="toggleComplete" @dismiss="removeTask" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import TodoForm from '@/components/TodoForm'
import TodoItem from '@/components/TodoItem'
export default {
  components: {
    TodoForm,
    TodoItem
  },
  data() {
    return {
      completed: false,
      title: ""
    }
  },
  computed: {
    ...mapGetters(['findBoardByTitle', 'getTasksByBoardId']),
    currentBoard() {
      return this.findBoardByTitle('default')
    },
    currentBoardTodos() {
      return this.getTasksByBoardId(this.currentBoard.id)
    },
    activeTodos() {
      return this.currentBoardTodos.filter(todoObj => !todoObj.completed)
    },
    completedTodos() {
      return this.currentBoardTodos.filter(todoObj => todoObj.completed)
    }
  },
  methods: {
    removeTask(id) {
      this.$store.dispatch('removeTask', id)
    },
    toggleComplete(id) {
      this.$store.dispatch('toggleComplete', id)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
