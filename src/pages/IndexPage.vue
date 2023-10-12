<!-- eslint-disable no-unused-vars -->
<template>
  <q-page padding>
    <q-table
      title="Gestão de Chamados"
      :rows="dados"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:body-cell-acoes="props">
        <q-td :props="props">
          <q-btn icon="edit" @click="editarItem(props.row)"></q-btn>
          <q-btn icon="delete" @click="excluirItem(props.row)"></q-btn>
        </q-td>
      </template>
    <template v-slot:top-right>
      <q-btn label="Novo" icon="add" color="green" :to="{name : 'NovoChamado'}"></q-btn>
    </template>
    </q-table>
    <q-dialog v-model="mostrarModalEdicao" maximized>
      <q-card>
        <q-card-section>
          <q-card-title class="text-h6">Editar Chamado</q-card-title>
        </q-card-section>
        <q-card-main>
          <!-- Formulário de edição aqui -->
          <q-input label="Nome do Animal" v-model="chamadoParaEdicao.nomeAnimal"></q-input>
          <q-select v-model="chamadoParaEdicao.tipoAnimal" :options="tipos" label="Tipo de Animal" />
          <q-select v-model="chamadoParaEdicao.idadeAnimal" :options="idades" label="Idade Animal" />
          <q-input label="Descrição do Chamado" v-model="chamadoParaEdicao.descricao"></q-input>
          <q-select v-model="chamadoParaEdicao.tipoChamado" :options="chamado" label="Tipo do Chamado" />
          <q-select v-model="chamadoParaEdicao.status" :options="status" label="Alterar Status" />
         <hr>
    <!-- Exibição da imagem selecionada (opcional) -->
    <p>Imagem Atual:</p>
    <div v-if="chamadoParaEdicao.imagemChamado">
      <img :src="chamadoParaEdicao.imagemChamado" alt="Imagem Selecionada" />
    </div>
    <q-input label="Selecione uma Nova Imagem"  outlined>
      <input type="file" @change="selecionarImagem" accept="image/*" />
    </q-input>
          <hr>
        </q-card-main>
        <q-card-actions align="right">
          <q-btn label="Cancelar" color="primary" @click="fecharModalEdicao" />
          <q-btn label="Salvar" color="positive" @click="salvarEdicao" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { api } from 'boot/axios'

const TAMANHO_IMAGEM = 300 // Tamanho desejado em pixels (300px, por exemplo)
const columns = [
  {
    name: 'id',
    required: true,
    label: 'Id',
    align: 'left',
    field: row => row.id,
    sortable: true
  },
  {
    name: 'nomeAnimal',
    label: 'Nome do Animal',
    align: 'left',
    field: row => row.nomeAnimal,
    sortable: true
  },
  {
    name: 'idadeAnimal',
    align: 'left',
    label: 'Idade Animal',
    field: row => row.idadeAnimal,
    sortable: true
  },
  {
    name: 'tipoAnimal',
    required: true,
    label: 'Tipo de Animal',
    align: 'left',
    field: row => row.tipoAnimal,
    sortable: true
  },
  {
    name: 'descricao',
    required: true,
    label: 'Tipo de Animal',
    align: 'left',
    field: row => row.descricao,
    sortable: true
  },
  {
    name: 'enderecoChamado',
    required: true,
    label: 'Endereço do Chamado',
    align: 'left',
    field: row => row.enderecoChamado,
    sortable: true
  },
  {
    name: 'status',
    required: true,
    label: 'Status do Chamado',
    align: 'left',
    field: row => row.status,
    sortable: true
  },
  {
    name: 'createdAt',
    required: true,
    label: 'Criado em:',
    align: 'left',
    field: row => row.createdAt,
    sortable: true
  },
  {
    name: 'updatedAt',
    required: true,
    label: 'Atualizado em:',
    align: 'left',
    field: row => row.updatedAt,
    sortable: true
  },
  {
    name: 'acoes',
    required: true,
    label: 'Ações',
    align: 'center',
    field: 'acoes',
    format: (value, item) => {
      // Use um formato personalizado para a coluna de ações
      return `
              <q-btn icon="edit" @click="editarItem(${JSON.stringify(item)})"></q-btn>
              <q-btn icon="delete" @click="excluirItem(${JSON.stringify(item)})"></q-btn>
            `
    }

  }

]

export default defineComponent({
  data () {
    return {
      mostrarModalEdicao: false, // Mostrar ou ocultar o modal de edição
      chamadoParaEdicao: {
        // Defina as propriedades do chamado em edição aqui
        nomeAnimal: '',
        tipoAnimal: '',
        idadeAnimal: '',
        descricao: '',
        tipoChamado: '',
        imagemChamado: '',
        status: ''
        // Adicione outros campos de edição aqui
      },
      // RECUPERA ID PARA EDITAR
      varteste: {
        id: ''
      },
      dados: [], // Dados da tabela
      columns, // Colunas da tabela
      idades: [
        '0-1 ano', '1-2 anos', '2-3 anos', '3-4 anos'
      ],
      tipos: [
        'Cachorro', 'Gato', 'Aves', 'Outros'
      ],
      chamado: [
        'Resgate', 'Adoção', 'Ajuda', 'Outros'
      ],
      status: [
        'Novo', 'EmAndamento', 'Pendente', 'Finalizado'
      ]
    }
  },
  mounted () {
    this.carregarDadosDaAPI()
  },
  methods: {
    carregarDadosDaAPI () {
      // Faça uma solicitação GET para a API para obter os dados da tabela
      api.get('chamados')
        .then(response => {
          // Configure os dados da tabela
          this.dados = response.data
        })
        .catch(error => {
          console.error('Erro ao buscar dados da tabela:', error)
        })
    },
    editarItem (item) {
      // Preencha os detalhes do chamado em edição com os dados do item selecionado
      this.chamadoParaEdicao.nomeAnimal = item.nomeAnimal
      this.chamadoParaEdicao.tipoAnimal = item.tipoAnimal
      this.chamadoParaEdicao.idadeAnimal = item.idadeAnimal
      this.chamadoParaEdicao.descricao = item.descricao
      this.chamadoParaEdicao.imagemChamado = item.imagemChamado
      this.chamadoParaEdicao.tipoChamado = item.tipoChamado
      this.chamadoParaEdicao.status = item.status
      this.varteste.id = item.id

      // Abra o modal de edição
      this.mostrarModalEdicao = true
    },
    selecionarImagem (event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()

        reader.onload = () => {
          const img = new Image()
          img.src = reader.result

          img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            // Calcula a proporção para redimensionar a imagem mantendo a proporção
            let proporcao = 1
            if (img.width > TAMANHO_IMAGEM || img.height > TAMANHO_IMAGEM) {
              if (img.width > img.height) {
                proporcao = TAMANHO_IMAGEM / img.width
              } else {
                proporcao = TAMANHO_IMAGEM / img.height
              }
            }

            // Define o tamanho do canvas com a proporção
            canvas.width = img.width * proporcao
            canvas.height = img.height * proporcao

            // Desenha a imagem redimensionada no canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            // Converte o canvas para uma URL de dados (base64)
            const imagemRedimensionada = canvas.toDataURL('image/jpeg') // Use 'image/png' se desejar formato PNG

            // Define a imagem redimensionada no campo do objeto
            this.chamadoParaEdicao.imagemChamado = imagemRedimensionada
          }

          img.src = reader.result
        }

        reader.readAsDataURL(file)
      }
    },
    salvarEdicao () {
      // Execute aqui a lógica para salvar as edições do chamado
      // Por exemplo, faça uma solicitação PUT para a API para atualizar o chamado
      api.patch(`chamados/${this.varteste.id}`, this.chamadoParaEdicao)
        .then(response => {
          // Atualize os dados na tabela após a edição
          const index = this.dados.findIndex(d => d.id === response.data.id)
          if (index !== -1) {
            this.dados.splice(index, 1, response.data)
          }
          window.alert('Edição Feita Com Sucesso!!')
          // Feche o modal de edição
          this.fecharModalEdicao()
        })
        .catch(error => {
          console.error('Erro ao salvar edição:', error)
        })
    },
    fecharModalEdicao () {
      // Limpe os detalhes do chamado em edição
      this.limparChamadoParaEdicao()
      // Feche o modal de edição
      this.mostrarModalEdicao = false
    },
    limparChamadoParaEdicao () {
      // Limpe as propriedades do chamado em edição
      this.chamadoParaEdicao.nomeAnimal = ''
      this.chamadoParaEdicao.tipoAnimal = ''
      this.chamadoParaEdicao.idadeAnimal = ''
      this.chamadoParaEdicao.descricao = ''
      this.chamadoParaEdicao.imagemChamado = ''
      this.chamadoParaEdicao.tipoChamado = ''
      this.chamadoParaEdicao.status = ''
      this.varteste.id = ''
      // Limpe outras propriedades conforme necessário
    },
    excluirItem (item) {
      // Exiba um alerta de confirmação
      const confirmacao = window.confirm('Tem certeza de que deseja excluir este item?')

      // Se o usuário confirmar, prossiga com a exclusão
      if (confirmacao) {
        // Solicitação DELETE para excluir o item da tabela
        api.delete(`chamados/${item.id}`)
          .then(() => {
            // Remova o item excluído da lista de dados local
            const index = this.dados.findIndex(d => d.id === item.id)
            if (index !== -1) {
              this.dados.splice(index, 1)
            }
            console.log('Item excluído com sucesso:', item)
          })
          .catch(error => {
            console.error('Erro ao excluir item:', error)
          })
      }
    }
  }
})
</script>
