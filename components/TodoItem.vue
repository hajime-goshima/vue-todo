<template>
  <div class="TodoItem">
    <span class="todo" :class="{'completed': this.completed}">{{this.todo}}</span>
    <div class="right">
      <span v-if="completed && completedAt" class="completed-datetime">{{formatedCompletedAt}}</span>
      <button @click="onClickAction">{{this.completed ? '戻す' : '完了'}}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    todo: String,
    completed: Boolean,
    completedAt: Date,
  },
  computed: {
    formatedCompletedAt() {
      return this.completedAt ? this.completedAt.toLocaleString('ja-JP') : 'no!'
    }
  },
  methods: {
    onClickAction() {
      console.log('onClickAction' + this.id)
      this.$emit('toggle', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.TodoItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .completed {
    color: #555;
    text-decoration: line-through;
  }
}
</style>