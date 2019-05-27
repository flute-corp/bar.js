<template>
  <v-card class="elevation-2 overflow-hidden">
    <div class="d-block p-relative">
      <img @click="reveal = true" :src="'/img/'+ article.id +'.jpg'" style="width: 100%;"/>
      <div class="floatingArea">
        <div class="d-block input-add-remove">
          <v-text-field
              :value="value"
              type="number"
              @input="setQt({idArticle: article.id, qt: +$event})"
              class="text-xs-center"
          />
          <v-btn fab dark small color="orange" class="btn-moins"
                 @click="setQt({idArticle: article.id, qt: ((value || 0) - 1)})"
          >
            <v-icon dark>remove</v-icon>
          </v-btn>
          <v-btn fab dark small color="blue" class="btn-plus"
            @click="setQt({idArticle: article.id, qt: ((value || 0) + 1)})"
          >
            <v-icon dark>add</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <v-card-title primary-title class="d-block">
      <div class="headline truncate">{{article.label}}</div>
      <span class="grey--text">{{article.prix}} €</span>
    </v-card-title>
    <v-dialog-bottom-transition>
      <div v-if="reveal" @click="reveal = false" class="p-absolute reveal" style="top: 0; left: 0; bottom: 0; right: 0; z-index: 1;">
      <v-card style="height: 100%">
        <v-card-title primary-title class="d-block">
          <div class="headline truncate mr-4">{{article.label}}</div>
          <p>{{article.desc || 'Aucune description'}}</p>
        </v-card-title>
        <v-btn class="p-absolute" style="top: 6px; right: 0;" flat icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-card>
      </div>
    </v-dialog-bottom-transition>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as commandeTypes from '../store/commandes/mutation-types'

const storeCommande = createNamespacedHelpers('commandes')

export default {
  name: 'article-card',
  props: {
    article: {
      type: Object,
      required: true
    },
    value: {
      type: Number
    }
  },
  data () {
    return {
      reveal: false
    }
  },
  methods: {
    ...storeCommande.mapActions({
      setQt: commandeTypes.COMMANDE_CURRENT_SET_ARTICLE
    })
  }
}
</script>

<style scoped>
  .floatingArea {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0 10px;
    margin: auto;
    width: 100%;
    min-width: 140px;
    text-align: right;
  }

  .input-add-remove {
    float: right;
    width: 80px;
    height: 40px;
    margin-right: 15px;
    position: relative;
    background: rgba(255, 255, 255, 0.75);
  }
  .input-add-remove > * {
    padding-top: 0;
  }
  .btn-moins, .btn-plus {
    z-index: 1;

    position: absolute;
    top: -13px;
  }
  .btn-moins {
    left: -25px;
  }
  .btn-plus {
    right: -25px;
  }
</style>
