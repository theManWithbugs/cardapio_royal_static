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

let pizza = null;

// =============================
// CONFIGURAÇÃO DE PREÇOS
// =============================
const pizzas = {

  Tradicional: {
    M: { preco: 40, limite: 2 },
    G: { preco: 50, limite: 3 },
    GG: { preco: 60, limite: 4 }
  },

  Premium: {
    M: { preco: 45, limite: 2 },
    G: { preco: 55, limite: 3 },
    GG: { preco: 65, limite: 4 }
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
    sabores: []
  };

  // TRADICIONAL
  if (tipo === "Tradicional") {

    divSabores.style.display = "block";

    divCurrentSize.textContent =
      `Tamanho selecionado: ${tamanho}`;
    divCurrentSize.classList.add("piscar");

    divMaxSabores.textContent =
      `Limite: ${config.limite} sabores`;

    divCurrentSabores.innerHTML = "";

  }

  // PREMIUM
  if (tipo === "Premium") {

    divSaboresPremium.style.display = "block";

    divCurrentSizePremium.textContent =
      `Tamanho selecionado: ${tamanho}`;
    divCurrentSizePremium.classList.add("piscar");

    divMaxSaboresPremium.textContent =
      `Limite: ${config.limite} sabores`;

    divCurrentSaboresPremium.innerHTML = "";

  }

}

// atalhos usados no HTML
function add_pizz_trad(tamanho){
  iniciarPizza("Tradicional", tamanho);
}

function add_pizz_premium(tamanho){
  iniciarPizza("Premium", tamanho);
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
  if (pizza.tipo === "Tradicional") {
    divCurrentSabores.appendChild(badge);
  }

  if (pizza.tipo === "Premium") {
    divCurrentSaboresPremium.appendChild(badge);
  }

}

function fomatar_nome(string) {

  let nome_formt = null;

  if (string === "fritas_m") nome_formt = "Porção de fritas M";
  if (string === "fritas_ame") nome_formt = "Porção de fritas americanas";
  if (string === "guarana_lata") nome_formt = "Guaraná Lata";
  if (string === "coca_lata") nome_formt = "Coca-cola lata";
  if (string === "agua_garrafinha") nome_formt = "Água garrafinha";
  if (string === "coca_2l") nome_formt = "Coca cola 2l";
  if (string === "fanta_2l") nome_formt = "Fanta 2l";
  if (string === "combo_1") nome_formt = "Combo Três Espetinhos";
  if (string === "combo_2") nome_formt = "Combo Cinco Espetinhos";

  return nome_formt;
}
