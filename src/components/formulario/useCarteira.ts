import { computed, ref } from "vue";

interface Formulario {
  valor: number | null;
  descricao: string;
  tipoEvento: string;
  dataEvento: string;
}

interface Operacao extends Formulario {
  id: number;
}

const formulario = ref<Formulario>({
  valor: null,
  descricao: "",
  tipoEvento: "",
  dataEvento: ""
});

const operacoes = ref<Operacao[]>([
  {
    id: 1,
    valor: 35.9,
    descricao: "Almoço no restaurante",
    tipoEvento: "Despesa",
    dataEvento: "2024-03-15"
  },
  {
    id: 3,
    valor: 2500,
    descricao: "Salário mensal",
    tipoEvento: "Renda",
    dataEvento: "2024-04-01"
  },
  {
    id: 4,
    valor: 89.5,
    descricao: "Gasolina",
    tipoEvento: "Renda",
    dataEvento: "2024-04-10"
  }
]);

function alertar(): void {
  alert("Bem alertado");
}

function adicionar(): void {
  if (
    formulario.value.valor === null ||
    !formulario.value.descricao.trim() ||
    !formulario.value.dataEvento.trim() ||
    !formulario.value.tipoEvento.trim()
  ) {
    alert("Campo obrigatório!");
    return;
  }

  if (formulario.value.descricao.length <= 4) {
    alert("Descrição deve ter mais de 4 digitos");
    return;
  }

  operacoes.value.push({
    id: Date.now(),
    descricao: formulario.value.descricao,
    valor: formulario.value.valor,
    tipoEvento: formulario.value.tipoEvento,
    dataEvento: formulario.value.dataEvento
  });
  alert("Adicionado com sucesso!");
  limparCampos();
}

function limparCampos(): void {
  formulario.value.valor = null;
  formulario.value.descricao = "";
  formulario.value.tipoEvento = "";
  formulario.value.dataEvento = "";
}

function remover(id: number): void {
  if (confirm("Apagar registro?")) {
    operacoes.value = operacoes.value.filter(op => op.id !== id);
  }
  alert("Deletado com sucesso!");
}

function moedaBR(valor: number | null | undefined): string {
  if (valor === null || valor === undefined) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valor);
}

function dataBR(data: string): string {
  if (!data) return "";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

const totalDespesas = computed(()=>{
  return operacoes.value.filter(op => op.tipoEvento === 'Despesa').reduce((acc,op)=>acc + (op.valor ?? 0),0)
})

const totalRendas = computed(()=>{
  return operacoes.value.filter(op=>op.tipoEvento==='Renda').reduce((acc,op) => acc + (op.valor ?? 0),0);
})

const saldo = computed(()=>{
  return totalRendas.value - totalDespesas.value;
})


export function useCarteira() {
  return {
    alertar,
    moedaBR,
    dataBR,
    formulario,
    operacoes,
    totalDespesas,
    totalRendas,
    saldo,
    adicionar,
    remover,
    limparCampos
  };
}
