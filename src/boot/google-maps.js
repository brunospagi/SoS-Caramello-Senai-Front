/* eslint-disable import/default */
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAxlmJFHM1QtoGv1PgdiVJFqyA1EqlrCuw',
    libraries: 'places' // Adicione 'places' para habilitar a pesquisa de lugares
  }
})
