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

export function useCarteira() {
  // --- ESTADOS (REFS) ---
  const idEditando = ref<number | null>(null);
  const campoFiltro = ref<string>("");

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

  // --- FUNÇÕES AUXILIARES E LIMPEZA ---
  function alertar(): void {
    alert("Bem alertado");
  }

  function limparCampos(): void {
    formulario.value.valor = null;
    formulario.value.descricao = "";
    formulario.value.tipoEvento = "";
    formulario.value.dataEvento = "";
  }

  function validarFormulario(): boolean {
    if (
      formulario.value.valor === null ||
      !formulario.value.descricao.trim() ||
      !formulario.value.dataEvento.trim() ||
      !formulario.value.tipoEvento.trim()
    ) {
      alert("Campo obrigatório!");
      return false;
    }

    if (formulario.value.descricao.length <= 4) {
      alert("Descrição deve ter mais de 4 digitos");
      return false;
    }

    return true;
  }

  // --- AÇÕES CRUD ---
  function adicionar(): void {
    if (!validarFormulario()) return;

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

  function remover(id: number): void {
    if (confirm("Apagar registro?")) {
      operacoes.value = operacoes.value.filter(op => op.id !== id);
      alert("Deletado com sucesso!");
    }
  }

  function editar(id: number): void {
    const operacaoEncontrada = operacoes.value.find(op => op.id === id);

    if (operacaoEncontrada) {
      idEditando.value = id;
      formulario.value = { ...operacaoEncontrada };
    }
  }

  function cancelarEdicao(): void {
    idEditando.value = null;
    limparCampos();
  }

  function salvarDadosAtualizacao(): void {
    if (!validarFormulario()) return;

    const index = operacoes.value.findIndex(op => op.id === idEditando.value);

    if (index !== -1) {
      operacoes.value[index] = {
        id: idEditando.value!,
        valor: formulario.value.valor,
        descricao: formulario.value.descricao,
        tipoEvento: formulario.value.tipoEvento,
        dataEvento: formulario.value.dataEvento
      };

      alert("Atualizado com sucesso!");
      idEditando.value = null;
      limparCampos();
    }
  }

  // --- FORMATADORES ---
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

  // --- COMPUTED PROPERTIES ---
  const totalDespesas = computed(() => {
    return operacoes.value
      .filter(op => op.tipoEvento === "Despesa")
      .reduce((acc, op) => acc + (op.valor ?? 0), 0);
  });

  const totalRendas = computed(() => {
    return operacoes.value
      .filter(op => op.tipoEvento === "Renda")
      .reduce((acc, op) => acc + (op.valor ?? 0), 0);
  });

  const saldo = computed(() => {
    return totalRendas.value - totalDespesas.value;
  });

  const filtrados = computed(() => {
    if (!campoFiltro.value) return operacoes.value;

    if (campoFiltro.value === "Despesa") {
      return operacoes.value.filter(op => op.tipoEvento === "Despesa");
    }
    if (campoFiltro.value === "Renda") {
      return operacoes.value.filter(op => op.tipoEvento === "Renda");
    }
    return operacoes.value;
  });


  return {
    alertar,
    moedaBR,
    dataBR,
    formulario,
    operacoes,
    totalDespesas,
    totalRendas,
    saldo,
    campoFiltro,
    filtrados,
    adicionar,
    remover,
    limparCampos,
    editar,
    idEditando,
    cancelarEdicao,
    salvarDadosAtualizacao
  };
}
