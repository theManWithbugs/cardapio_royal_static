
const divCurrentBebidas = document.getElementById("current_bebidas");
const divTitleBebidas = document.getElementById("title_bebidas");

let drinks = [];

function add_bebida(drink) {

  drinks.push(drink);

  divTitleBebidas.textContent = "Bebidas selecionadas";
  divTitleBebidas.classList.add("piscar");

  let nome_formt = fomatar_nome(drink);

  const current_bebida = document.createElement("span");
  current_bebida.textContent = `${nome_formt}`;
  current_bebida.classList.add("btn", "btn-secondary");
  current_bebida.style.marginLeft = "7px";
  current_bebida.style.marginTop = "5px";
  current_bebida.style.marginBottom = "5px";
  divCurrentBebidas.appendChild(current_bebida);
}

function add_drinks() {

  if (drinks.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Atenção",
      text: "Nenhuma bebida selecionada"
    });
    return;
  }

  drinks.forEach((drink) => {

    let preco = 0;

    let nome_formt = fomatar_nome(drink);

    if (drink === "guarana_lata") preco = 6;
    if (drink === "coca_lata") preco = 6;
    if (drink === "agua_garrafinha") preco = 4;
    if (drink === "coca_2l") preco = 12;
    if (drink === "fanta_2l") preco = 12;

    carrinho.push({
      tipo: "Bebida",
      nome: nome_formt,
      preco: preco
    });

  });

  drinks = [];

  divTitleBebidas.innerHTML = "";
  divCurrentBebidas.innerHTML = "";

  atualizarCarrinho();

  Swal.fire({
    icon: "success",
    title: "Bebidas adicionadas!",
    timer: 1500,
    showConfirmButton: false
  });

}