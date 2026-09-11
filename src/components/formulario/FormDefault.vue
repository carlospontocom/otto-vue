<template>
<section id="formulario" class="container" >

  
  <div class="container-fields">
  <CampoTexto type="text" placeholder="R$ 9.000,00" v-model="formulario.valor"/>
  <CampoTexto type="text" placeholder="Descrição" v-model="formulario.descricao"/>
  <q-select v-model="formulario.tipo" label="Selecione o tipo" :options="itensOpcoes" outlined/> 
   <q-btn color="primary" label="adicionar" @click="adicionar"/>
</div>

<ul>
    <li v-for="transacao in transacoes" :key="transacao.id">
        {{transacao.valor}}
    </li>
</ul>

  </section>
</template>

<script setup lang="ts">
import '@/css/formCarteira.scss';
import {ref} from 'vue';
import CampoTexto from '@/components/formulario/CampoTexto.vue';
const itensOpcoes = ref<string[]>(['Receita','Despesa']);
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


function adicionar() :void{
    transacoes.value.push({
    id:Date.now(),
    valor:formulario.value.valor,
    descricao:formulario.value.descricao,
    tipo:formulario.value.tipo
    })

    alert("Adicionado")
}

</script>