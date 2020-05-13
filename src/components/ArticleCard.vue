<template>
  <div class="col-12 col-md-4 col-lg-3">
    <q-card class="shadow-2">
      <q-img @click="reveal = true" :src="'/img/'+ article.id +'.jpg'"
             height="250px">
        <template #error>
          <q-img src="/img/404.jpg" />
        </template>
      </q-img>
      <q-card-section class="row justify-end">
        <q-input
            :value="value || 0"
            type="number"
            @input="setQt({idArticle: article.id, qt: +$event})"
            class="col-6"
            input-class="text-center textfield"
        >
          <template #prepend>
            <q-btn fab-mini color="orange" icon="fa fa-minus"
                   @click="setQt({idArticle: article.id, qt: ((value || 0) - 1)})"
            />
          </template>
          <template #append>
            <q-btn fab-mini color="blue" icon="fa fa-plus"
                   @click="setQt({idArticle: article.id, qt: ((value || 0) + 1)})"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">{{article.label}}</div>
        <div class="text-subtitle2">{{article.prix}} €</div>
      </q-card-section>
    </q-card>
  </div>
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
