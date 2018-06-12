<template>
  <v-card class="elevation-2">
    <v-card-media>
      <div class="d-block">
        <img :src="'/img/'+ article.id +'.jpg'" style="width: 100%;"/>
      </div>
    </v-card-media>
    <v-card-title primary-title class="d-block">
      <div class="headline truncate">{{article.label}}</div>
      <span class="grey--text">{{article.prix}} €</span>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'article-card',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
