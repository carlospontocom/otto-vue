<template>
  <div class="container">
    <div class="resumo">
      <div class="saldo">
        <span>saldo</span>
        <p> {{ moedaBR(saldo) }}</p>
      </div>
      <div class="despesa">
        <span>despesa</span>
        <p> {{ moedaBR(totalDespesas) }}</p>
      </div>
      <div class="renda">
        <span>renda</span>
        <p> {{ moedaBR(totalRendas) }}</p>
      </div>
    </div>

    <form class="form" @submit.prevent="adicionar">
      <input
        type="number"
        step="0.01"
        v-model.number="formulario.valor"
        placeholder="Valor"
      />
      <input
        type="text"
        v-model="formulario.descricao"
        placeholder="Descrição"
      />
      <select v-model="formulario.tipoEvento">
        <option value="" disabled>Selecione o tipo</option>
        <option value="Renda">Renda</option>
        <option value="Despesa">Despesa</option>
      </select>
      <input type="date" v-model="formulario.dataEvento" />

      <button class="btn-add" type="submit">Adicionar</button>
    </form>

    <div class="barsearch">
      <strong>Filtrar por: </strong>
      <select v-model="campoFiltro">
        <option value="">Todos</option>
        <option value="Renda">Renda</option>
        <option value="Despesa">Despesa</option>
      </select>
    </div>

    <ul class="list">
      <li v-for="operacao in filtrados" :key="operacao.id" class="item-list">
        <p>{{ operacao.descricao }}</p>
        <p>{{ moedaBR(operacao.valor) }}</p>
        <p>{{ operacao.tipoEvento }}</p>
        <p>{{ dataBR(operacao.dataEvento) }}</p>
        <div class="actions">
          <button @click="remover(operacao.id)" class="delete"> x </button>
          <button class="edit"> editar </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCarteira } from "./useCarteira";
import "@/css/carteira.scss";
const {
  alertar,
  moedaBR,
  dataBR,
  formulario,
  totalDespesas,
  totalRendas,
  filtrados,
  campoFiltro,
  saldo,
  operacoes,
  adicionar,
  remover,
  limparCampos
} = useCarteira();
</script>
