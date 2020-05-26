<template>
  <q-table :data="commande"
           :columns="$options.COLUMNS">
    <template #body-cell-avatar="props">
      <q-td :props="props" auto-width>
        <q-avatar>
          <q-img :src="'/img/'+ props.row.id +'.jpg'" />
        </q-avatar>
      </q-td>
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'TableCommande',
  COLUMNS: [
    {
      name: 'avatar',
      field: 'img'
    },
    {
      label: 'Article',
      name: 'label',
      field: 'label',
      sortable: true
    },
    {
      label: 'Prix µ',
      name: 'prix',
      field: 'prix',
      sortable: true
    },
    {
      label: 'Quantité',
      name: 'qt',
      field: 'qt',
      sortable: true
    },
    {
      label: 'Total',
      name: 'total',
      field: 'total',
      format: (v, r) => (r.qt * r.prix) + '€',
      sortable: true
    }
  ],
  props: {
    commande: Array
  }
}
</script>

<style scoped>

</style>
