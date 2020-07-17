<template>
  <ValidationObserver v-slot="{ handleSubmit, errors }" slim ref="taskForm">
    <form @submit.prevent="{handleSubmit(addTodo)}" class="mt-4 flex flex-row items-center justify-center">

      <ValidationProvider rules="required" slim v-slot="{ classes }">
        <input type="checkbox" v-model="completed" name="check" :class="classes" class="h-8 w-8 mr-2" />
      </ValidationProvider>
      
      <ValidationProvider rules="required" slim v-slot="{ classes }" mode="input">
        <input type="text" v-model="title" name="todoTitle" :class="classes" class="text-xl px-2 mr-2 border rounded-sm border-gray-500" placeholder="todoを入力..."/>
      </ValidationProvider>
      
      <input type="submit" name="submit" class="px-4 text-blue-500 bg-blue-200 border border-gray-500 rounded-sm" style="padding: 0.20rem;" value="保存" />
    </form>
    <div
    v-show="Object.keys(errors).map(key => errors[key]).flat().length > 0"
      class="flex items-center justify-center h-4 my-4 text-xs"
      v-html="Object.keys(errors).map(key => errors[key]).flat().join('<br>')"
    ></div>
  </ValidationObserver>
</template>

<script>
import {mapGetters} from 'vuex'
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    id: Number
  },
  data: () => ({
    completed: false,
    title: ""
  }),
  computed: {
    ...mapGetters(['findBoardByTitle']),
    currentBoard() {
      return this.findBoardByTitle('default')
    },
  },
  methods: {
    addTodo() {
      this.$store.dispatch('addTask', {
        boardId: this.currentBoard.id,
        title: this.title,
        completed: this.completed
      })
      document.activeElement.blur();
      this.title = ""
      this.completed = false
      this.$refs.taskForm.reset();
    },
  }
}
</script>

<style lang="scss" scoped>
  input[type='text'] {
    &.is-invalid {
      @apply bg-red-200 border-red-800;
    }
  }
</style>