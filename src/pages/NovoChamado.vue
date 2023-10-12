  <template>
  <q-page class="column items-center justify-center">
    <h2>NOVO RESGATE</h2>
    <q-card class="create-account-card">
      <q-separator inset />
      <q-card-section class="column q-gutter-md">
    <q-form @submit="handleSubmit">
      <q-input label="Nome Do Animal" outline v-model="form.nomeAnimal"></q-input>
      <q-select v-model="form.tipoAnimal" :options="tipos" label="Tipo de Animal" />
      <q-select v-model="form.idadeAnimal" :options="idades" label="Idade Animal" />
      <q-input label="Selecione uma imagem"  outlined>
      <input type="file" @change="selecionarImagem" accept="image/*" />
    </q-input>
    <!-- Exibição da imagem selecionada (opcional) -->
    <div v-if="form.imagemChamado">
      <img :src="form.imagemChamado" alt="Imagem Selecionada" />
    </div>
      <q-input label="Descrição" :rules="regraForm" type="textarea"
 outline v-model="form.descricao"></q-input>
      <q-btn @click="localizar" icon="map">Localizar</q-btn>
      <q-input label="Endereço" :rules="regraForm" outline v-model="form.enderecoChamado"></q-input>
      <q-select v-model="form.tipoChamado"  :options="chamado" label="Tipo de Chamado" />
      <div>
        <q-btn label="Registrar" color="green" icon="save" type="submit"></q-btn>
      </div>
    </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="scss">
.create-account-card {
  width: 1280px;
}

</style>
<script>
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NovoChamado',
  setup () {
    const form = ref({
      nomeAnimal: '',
      idadeAnimal: '',
      tipoAnimal: '',
      descricao: '',
      imagemChamado: '',
      latitudeChamado: '',
      longitudeChamado: '',
      enderecoChamado: '',
      tipoChamado: '',
      status: 'Novo'
    })

    const router = useRouter()
    const handleSubmit = async () => {
      try {
        await api.post('/chamados', form.value)
        window.alert('Chamado Criado Com Sucesso!!')
        router.push({ name: 'PaginaInicial' })
      } catch (error) {
        console.error(error)
      }
    }
    const regraForm = [
      val => (val && val.length > 0) || 'Campo Obrigatorio'
    ]

    return {
      form,
      idades: [
        '0-1 ano', '1-2 anos', '2-3 anos', '3-4 anos'
      ],
      tipos: [
        'Cachorro', 'Gato', 'Aves', 'Outros'
      ],
      chamado: [
        'Resgate', 'Adoção', 'Ajuda', 'Outros'
      ],
      handleSubmit,
      regraForm
    }
  },
  methods: {
    localizar () {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          this.form.latitudeChamado = position.coords.latitude
          this.form.longitudeChamado = position.coords.longitude
          this.obterEndereco()
        })
      } else {
        alert('Geolocalização não suportada neste navegador.')
      }
    },
    obterEndereco () {
      const apiKey = 'AIzaSyAxlmJFHM1QtoGv1PgdiVJFqyA1EqlrCuw'
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.form.latitudeChamado},${this.form.longitudeChamado}&key=${apiKey}`
      axios.get(apiUrl)
        .then(response => {
          if (response.data.results && response.data.results[0]) {
            this.form.enderecoChamado = response.data.results[0].formatted_address
          } else {
            this.form.enderecoChamado = 'Endereço não encontrado'
          }
        })
        .catch(error => {
          console.error(error)
          this.form.enderecoChamado = 'Erro ao obter o endereço'
        })
    },
    selecionarImagem (event) {
      const file = event.target.files[0]
      if (file) {
        // Converte o arquivo de imagem em uma URL de dados (base64) para exibição
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.form.imagemChamado = reader.result
        }
      }
    }
  }
})

</script>
