<template>
  <v-container fluid class="pa-2">
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-expansion-panel expand>
          <v-expansion-panel-content v-for="(category, i) in carte" :key="category.id"
                                     hide-actions>
            <div slot="header">
              <v-icon class="pr-1">{{ category.icon }}</v-icon>
              {{ category.label }}
              <div class="grey--text" style="float: right">
                {{ totauxParCategories[i] }}
              </div>
            </div>
            <v-card class="grey lighten-3">
              <v-container fluid grid-list-md>
                <v-layout row wrap>
                  <v-flex xs6 sm3 v-for="article in category.articles" :key="article.id">
                    <article-card :value="current.cmd[article.id]" :article="article"/>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import {mapGetters, createNamespacedHelpers} from 'vuex'
import ArticleCard from '../components/ArticleCard'
const storeCommande = createNamespacedHelpers('commandes')

export default {
  components: {ArticleCard},
  computed: {
    ...mapGetters(
      {
        carte: 'getCarte'
      }
    ),
    ...storeCommande.mapState(['current']),
    totauxParCategories () {
      return this.carte.map((c) => c.articles.reduce((a, b) => a + (this.current.cmd[b.id] || 0), 0))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
