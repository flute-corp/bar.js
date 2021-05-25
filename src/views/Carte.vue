<template>
  <q-page>
    <q-list bordered>
      <template v-for="(category, i) in carte">
        <q-separator :key="'separator-' +category.id"/>
        <q-expansion-item :key="category.id">
          <template #header>
            <q-item-section avatar>
              <q-icon :name="category.icon"/>
            </q-item-section>
            <q-item-section>
              {{ category.label }}
            </q-item-section>
            <q-item-section side>
              {{ totauxParCategories[i] }}
            </q-item-section>
          </template>
          <q-card>
            <q-card-section>
              <div class="row q-col-gutter-md">
                <article-card v-for="article in category.articles" :key="article.id"
                              :value="current.cmd[article.id]" :article="article"/>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </template>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters, createNamespacedHelpers } from 'vuex'
import ArticleCard from '../components/ArticleCard'

const storeCommande = createNamespacedHelpers('commandes')

export default {
  components: { ArticleCard },
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
