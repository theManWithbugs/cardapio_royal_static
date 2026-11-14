// Tradicional
const divCurrentSabores = document.getElementById("current_sabores");
const divCurrentSize = document.getElementById("selec_size");
const divMaxSabores = document.getElementById("div_max_sabores");
const divSabores = document.getElementById("sabores");

// Premium
const divCurrentSaboresPremium = document.getElementById("current_sabores_premium");
const divCurrentSizePremium = document.getElementById("selec_size_premium");
const divMaxSaboresPremium = document.getElementById("div_max_sabores_premium");
const divSaboresPremium = document.getElementById("sabores_premium");
const divCurrentSaboresDoce = document.getElementById("current_sabores_doce");
const divCurrentSizeDoce = document.getElementById("selec_size_doce");
const divMaxSaboresDoce = document.getElementById("div_max_sabores_doce");
const divSaboresDoce = document.getElementById("sabores_doce");
const divCurrentBordaTrad = document.getElementById("current_borda_trad");
const divCurrentBordaPremium = document.getElementById("current_borda_premium");
const divPromoSaboresGG = document.getElementById("promo_sabores_gg");
const divPromoSaborDoce = document.getElementById("promo_sabor_doce");

let pizza = null;
let saboresPromoGG = [];
let saborPromoDoce = null;
let botaoSaborDocePromo = null;

// =============================
// CONFIGURAÇÃO DE PREÇOS
// =============================
const pizzas = {

  Tradicional: {
    M: { preco: 45, limite: 3 },
    G: { preco: 55, limite: 3 },
    GG: { preco: 65, limite: 3 }
  },

  Premium: {
    M: { preco: 50, limite: 3 },
    G: { preco: 60, limite: 3 },
    GG: { preco: 70, limite: 3 }
  },

  Doce: {
    M: { preco: 50, limite: 3 },
    G: { preco: 60, limite: 3 },
    GG: { preco: 70, limite: 3 }
  }

};

// =============================
// INICIAR PIZZA
// =============================
function iniciarPizza(tipo, tamanho) {

  const config = pizzas[tipo][tamanho];

  pizza = {
    tipo: tipo,
    tamanho: tamanho,
    preco: config.preco,
    borda: null,
    sabores: []
  };

  const sections = {
    Tradicional: {
      sabores: divSabores,
      tamanho: divCurrentSize,
      limite: divMaxSabores,
      currentSabores: divCurrentSabores
    },
    Premium: {
      sabores: divSaboresPremium,
      tamanho: divCurrentSizePremium,
      limite: divMaxSaboresPremium,
      currentSabores: divCurrentSaboresPremium
    },
    Doce: {
      sabores: divSaboresDoce,
      tamanho: divCurrentSizeDoce,
      limite: divMaxSaboresDoce,
      currentSabores: divCurrentSaboresDoce
    }
  };
  const section = sections[tipo];

  section.sabores.style.display = "block";
  section.tamanho.textContent = `Tamanho selecionado: ${tamanho}`;
  section.tamanho.classList.add("piscar");
  section.limite.textContent = `Limite: ${config.limite} sabores`;
  section.currentSabores.innerHTML = "";

  if (tipo === "Tradicional") {
    divCurrentBordaTrad.textContent = "Sem borda";
  }
  if (tipo === "Premium") {
    divCurrentBordaPremium.textContent = "Sem borda";
  }

}

// atalhos usados no HTML
function add_pizz_trad(tamanho){
  iniciarPizza("Tradicional", tamanho);
}

function add_pizz_premium(tamanho){
  iniciarPizza("Premium", tamanho);
}

function add_pizz_doce(tamanho){
  iniciarPizza("Doce", tamanho);
}

// =============================
// SELECIONAR SABOR
// =============================
function selec_sabor(sabor) {

  if (!pizza) {

    Swal.fire({
      icon: "warning",
      title: "Atenção",
      text: "Selecione o tamanho da pizza primeiro!"
    });

    return;
  }

  const limite =
    pizzas[pizza.tipo][pizza.tamanho].limite;

  if (pizza.sabores.length >= limite) {

    Swal.fire({
      icon: "error",
      title: "Limite atingido",
      text: `Máximo de ${limite} sabores`
    });

    return;
  }

  pizza.sabores.push(sabor);

  const badge = document.createElement("span");

  badge.className = "badge bg-warning";
  badge.style.marginLeft = "5px";
  badge.textContent = sabor;

  // adiciona no local correto
  const currentSabores = {
    Tradicional: divCurrentSabores,
    Premium: divCurrentSaboresPremium,
    Doce: divCurrentSaboresDoce
  };
  currentSabores[pizza.tipo].appendChild(badge);

}

function selecionarBorda(nome, preco) {

  if (!pizza) {
    Swal.fire({
      icon: "warning",
      title: "Atenção",
      text: "Selecione o tamanho da pizza primeiro!"
    });
    return;
  }

  pizza.borda = preco === 0 && nome === "Sem borda" ? null : nome;
  pizza.preco = pizzas[pizza.tipo][pizza.tamanho].preco + preco;

  const divCurrentBorda =
    pizza.tipo === "Tradicional" ? divCurrentBordaTrad : divCurrentBordaPremium;
  divCurrentBorda.textContent =
    pizza.borda ? `Borda selecionada: ${pizza.borda}` : "Sem borda";
}

function selecionarSaborCombo(sabor, botao) {

  const index = saboresPromoGG.indexOf(sabor);
  if (index >= 0) {
    saboresPromoGG.splice(index, 1);
    botao.classList.remove("is-selected");
    divPromoSaboresGG.textContent = saboresPromoGG.length
      ? `Sabores da pizza GG: ${saboresPromoGG.join(", ")} (${saboresPromoGG.length}/3)`
      : "";
    return;
  }

  if (saboresPromoGG.length >= 3) {
    Swal.fire({
      icon: "error",
      title: "Limite atingido",
      text: "Escolha até 3 sabores para a pizza GG."
    });
    return;
  }

  saboresPromoGG.push(sabor);
  botao.classList.add("is-selected");
  divPromoSaboresGG.textContent =
    `Sabores da pizza GG: ${saboresPromoGG.join(", ")} (${saboresPromoGG.length}/3)`;
}

function selecionarDoceCombo(sabor, botao) {
  if (botaoSaborDocePromo) {
    botaoSaborDocePromo.classList.remove("is-selected");
  }
  saborPromoDoce = sabor;
  botaoSaborDocePromo = botao;
  botao.classList.add("is-selected");
  divPromoSaborDoce.textContent = `Pizza doce M: ${sabor}`;
}

function adicionarComboPromo() {

  if (saboresPromoGG.length === 0 || !saborPromoDoce) {
    Swal.fire({
      icon: "warning",
      title: "Escolha os sabores",
      text: "Selecione ao menos um sabor para a pizza GG e um para a pizza doce M."
    });
    return;
  }

  carrinho.push({
    tipo: "Combo promocional",
    sabores: saboresPromoGG.slice(),
    saborDoce: saborPromoDoce,
    preco: 80
  });

  saboresPromoGG = [];
  saborPromoDoce = null;
  document.querySelectorAll("#combo_promocional .is-selected")
    .forEach((botao) => botao.classList.remove("is-selected"));
  botaoSaborDocePromo = null;
  divPromoSaboresGG.textContent = "";
  divPromoSaborDoce.textContent = "";
  atualizarCarrinho();

  Swal.fire({
    icon: "success",
    title: "Combo adicionado!",
    timer: 1500,
    showConfirmButton: false
  });
}

function fomatar_nome(string) {

  let nome_formt = null;

  if (string === "fritas_m") nome_formt = "Porção de fritas M";
  if (string === "fritas_ame") nome_formt = "Porção de fritas americanas";
  if (string === "guarana_lata") nome_formt = "Guaraná Lata";
  if (string === "guarana_1l") nome_formt = "Guaraná 1L";
  if (string === "guarana_2l") nome_formt = "Guaraná 2L";
  if (string === "coca_lata") nome_formt = "Coca-cola lata";
  if (string === "coca_1l") nome_formt = "Coca-Cola 1L";
  if (string === "agua_garrafinha") nome_formt = "Água garrafinha";
  if (string === "coca_2l") nome_formt = "Coca cola 2l";
  if (string === "fanta_2l") nome_formt = "Fanta 2l";
  if (string === "fanta_lata") nome_formt = "Fanta lata";
  return nome_formt;
}
