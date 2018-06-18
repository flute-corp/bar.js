<template>
  <v-avatar @click.stop="$emit('click', $event)" :size="size" :color="user.id ? 'green' :'green'">
    <template v-if="user.id">
      <img v-if="user.avatar" :src="user.avatar" :alt="user.name[0]" />
      <span v-else>{{ user.name[0] }}</span>
    </template>
    <v-icon v-else>account_circle</v-icon>
  </v-avatar>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    user: {
      type: Object,
      default: () => ({
        id: null,
        name: 'Anonyme'
      })
    },
    size: {
      type: Number,
      default: 40
    }
  }
}
</script>

<style scoped>
  :hover {
    cursor: pointer;
  }
</style>
