<template>
<section id="formulario" class="container" >
  <CampoTexto type="text" placeholder="R$ 9.000,00" v-model="formulario.valor"/>
  <CampoTexto type="text" placeholder="Descrição" v-model="formulario.descricao"/>
  <select v-model="formulario.tipo">
    <option value="renda">Renda</option>
    <option value="gasto">Gasto</option>
  </select>
  <button>Adicionar</button>
  </section>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import CampoTexto from '@/components/formulario/CampoTexto.vue';

interface Formulario{
  valor:number | null,
  descricao:string,
  tipo:string
}

const formulario = ref<Formulario>({
  valor:null,
  descricao:'',
  tipo:''
  })

interface Transacao extends Formulario {
  id:number
}
 

const transacoes = ref<Transacao[]>([
{
  id:1,
  valor:200,
  descricao:"roupas",
  tipo:"gasto"
},
{
  id:2,
  valor:5200,
  descricao:"salário",
  tipo:"renda"
},
{
  id:3,
  valor:1100,
  descricao:"terceiro salário",
  tipo:"renda"
}
])

</script>