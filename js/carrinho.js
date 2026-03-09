const divCarrinho = document.getElementById("div_carrinho");

let carrinho = [];

function adicionarCarrinho() {

  if (!pizza || pizza.sabores.length === 0) {

    Swal.fire({
      icon: "warning",
      title: "Ops!",
      text: "Selecione pelo menos um sabor."
    });

    return;
  }

  carrinho.push(pizza);

  pizza = null;

  // limpar tradicional
  divSabores.style.display = "none";
  divCurrentSize.textContent = "";
  divMaxSabores.textContent = "";
  divCurrentSabores.innerHTML = "";

  // limpar premium
  divSaboresPremium.style.display = "none";
  divCurrentSizePremium.textContent = "";
  divMaxSaboresPremium.textContent = "";
  divCurrentSaboresPremium.innerHTML = "";

  atualizarCarrinho();

  Swal.fire({
    icon: "success",
    title: "Adicionado!",
    timer: 1500,
    showConfirmButton: false
  });

}

function atualizarCarrinho() {

  divCarrinho.innerHTML = "";

  if (carrinho.length === 0) {

    divCarrinho.innerHTML =
      '<p class="text-center text-muted fst-italic">Carrinho vazio.</p>';

    return;
  }

  let total = 0;

  carrinho.forEach((item, i) => {

    total += item.preco;

    const p = document.createElement("p");

    if (item.tipo === "Tradicional" || item.tipo === "Premium") {
      p.textContent =
        `${item.tipo} | ${item.tamanho} | ` +
        `Sabores: ${item.sabores.join(", ")} | ` +
        `R$ ${item.preco}`;
    }

    if (item.tipo === "Espetinho") {

      p.textContent =
        `Espetinho ${item.nome} | Sabor: ${item.sabor.join(", ")} | R$ ${item.preco}`;
    }

    if (item.tipo === "Bebida") {

      p.textContent =
        `Bebida: ${item.nome.replace("_", " ")} | R$ ${item.preco}`;

    }

    if (item.tipo === "Extra") {
      p.textContent =
        `Extra: ${item.nome} | R$ ${item.preco}`;
    }

    divCarrinho.appendChild(p);
  });

  const totalDiv = document.createElement("div");

  totalDiv.className = "text-end mt-3";
  totalDiv.innerHTML = `<strong>Total: R$ ${total}</strong>`;

  divCarrinho.appendChild(totalDiv);

}

function enviarWhatsApp() {

  if (carrinho.length === 0) {

    Swal.fire({
      icon: "warning",
      title: "Carrinho vazio"
    });

    return;
  }

  const numero = "556899992260";

  let mensagem =
    "Olá! Pedido da Pizzaria Royal:\n\n";

  let total = 0;

  carrinho.forEach((item) => {

    total += item.preco;

    // PIZZA
    if (item.tipo === "Tradicional" || item.tipo === "Premium") {

      mensagem +=
        `Pizza ${item.tipo} ${item.tamanho}\n` +
        `Sabores: ${item.sabores.join(", ")}\n` +
        `Valor: R$ ${item.preco}\n\n`;

    }

    // ESPETINHO
    if (item.tipo === "Espetinho") {

      mensagem +=
        `Espetinho ${item.nome}\n` +
        `Valor: R$ ${item.preco}\n\n`;

    }

    // Bebida
    if (item.tipo === "Bebida") {

      mensagem +=
        `Bebida: ${item.nome.replace("_", " ")}\n` +
        `Valor: R$ ${item.preco}\n\n`;

    }

    //Extra
    if (item.tipo === "Extra") {
      mensagem +=
        `Extra: ${item.nome} | R$ ${item.preco}\n\n`;
    }

  });

  mensagem += `TOTAL: R$ ${total}`;

  const url =
    `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");

}

function limpar_carrinho() {

  Swal.fire({
    title: "Tem certeza?",
    text: "Tem certeza que deseja limpar o carrinho?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      carrinho = [];
      atualizarCarrinho();
    }
  });

}
