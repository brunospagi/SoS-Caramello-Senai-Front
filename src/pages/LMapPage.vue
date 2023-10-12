<template>
  <div>
    <div id="map" style="height: 900px;"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import axios from 'axios'

export default {
  setup () {
    const map = ref(null)

    onMounted(() => {
      // Crie um mapa Leaflet e adicione-o à div com o id "map"
      map.value = L.map('map').setView([-25.4953506, -49.2453753], 13) // [latitude, longitude], zoom

      // Adicione um provedor de mapa, por exemplo, o OpenStreetMap
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value)

      // Ícones personalizados para cada tipo de solicitação
      const iconeStatus = {
        Novo: L.icon({
          iconUrl: 'https://p7.hiclipart.com/preview/574/8/1014/computer-icons-image-map-location-logo.jpg', // Substitua pelo URL da imagem do marcador verde
          iconSize: [50, 50]
        }),
        EmAndamento: L.icon({
          iconUrl: 'https://p7.hiclipart.com/preview/574/8/1014/computer-icons-image-map-location-logo.jpg', // Substitua pelo URL da imagem do marcador azul
          iconSize: [32, 32]
        }),
        Pendente: L.icon({
          iconUrl: 'https://p7.hiclipart.com/preview/574/8/1014/computer-icons-image-map-location-logo.jpg', // Substitua pelo URL da imagem do marcador vermelho
          iconSize: [32, 32]
        }),
        Finalizado: L.icon({
          iconUrl: 'https://p7.hiclipart.com/preview/574/8/1014/computer-icons-image-map-location-logo.jpg', // Substitua pelo URL da imagem do marcador vermelho
          iconSize: [32, 32]
        })
      }

      axios.get('http://localhost:3000/chamados')
        .then(response => {
          const data = response.data
          // Itere pelos dados e adicione marcadores ao mapa
          data.forEach(item => {
            const mapsURL = `https://www.google.com/maps/dir/?api=1&destination=${item.latitudeChamado},${item.longitudeChamado}`
            const imagemChamado = '<img src="' + item.imagemChamado + '" alt="Imagem Selecionada" />'
            const marker = L.marker([item.latitudeChamado, item.longitudeChamado], { icon: iconeStatus[item.status] }).addTo(map.value)
            marker.bindPopup('<b>STATUS: </b>' + item.status + '<br>' + ' <b> TIPO: </b>' + item.tipoChamado + '<br>' +
             '<b>ANIMAL: </b>' + item.tipoAnimal + '<br>' + '<b>IDADE: </b>' + item.idadeAnimal + '<br>' + '<b>Imagem Atual: </b> <br>' + imagemChamado +
             '<br>' + '<b>Endereço: </b>' + item.enderecoChamado + '<br>' + '<a href="' + mapsURL + '">⇒ Obter Rota</a>') // Exiba um pop-up com informações
          })
        })
        .catch(error => {
          console.error('Erro ao obter dados de localização:', error)
        })
    })
    return {
      map
    }
  },
  carregarDadosDaAPI () {
    // Faça uma solicitação GET para a API para obter os dados da tabela
    axios.get('chamados')
      .then(response => {
        const data = response.data

        // Itere pelos dados e adicione marcadores ao mapa
        data.forEach(item => {
          const marker = L.marker([item.latitudeChamado, item.longitudeChamado]).addTo(this.map.value)
          marker.bindPopup(item.status) // Exiba um pop-up com informações
        })
      })
      .catch(error => {
        console.error('Erro ao obter dados de localização:', error)
      })
  }
}

</script>
