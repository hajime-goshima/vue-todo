<template>
  <a href="" @click.prevent="onClickItem" class="flex flex-row justify-between">
    <span class="" :class="{'line-through': completed}">{{title}}</span>
    <div>
      <span v-if="completedAt" class="text-gray-600">{{formatedCompletedAt}}</span>
      <a class="text-gray-500">
        <font-awesome-icon icon="minus-circle" @click.stop.prevent="onClickDismiss" class="hover:text-gray-700"/>
      </a>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    completed: Boolean,
    completedAt: Date,
  },
  computed: {
    formatedCompletedAt() {
      return this.completedAt ? this.$dayjs().format('YYYY年MM月DD日 HH:mm:ss') : ''
    }
  },
  methods: {
    onClickItem() {
      console.log('onClickAction' + this.id)
      this.$emit('toggle', this.id)
    },
    onClickDismiss() {
      console.log('onClickDismiss' + this.id)
      this.$emit('dismiss', this.id)
    }
  }
}
</script>

<style lang="scss" scoped></style>