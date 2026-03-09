
const divTitleExtras = document.getElementById("title_extras");
const divCurrentExtras = document.getElementById("current_extras");

let extras = [];

function add_extra(item) {

  extras.push(item);

  let nome_formt = fomatar_nome(item);

  divTitleExtras.textContent = "Extras selecionados";
  divTitleExtras.classList.add("piscar");

  const current_extra = document.createElement("span");
  current_extra.textContent = `${nome_formt}`;
  current_extra.classList.add("btn", "btn-secondary");
  current_extra.style.marginLeft = "7px";
  current_extra.style.marginTop = "5px";
  divCurrentExtras.appendChild(current_extra);
}

function add_extra_carrinho() {

  if (extras.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Atenção",
      text: "Nenhuma extra foi selecionado"
    });
    return;
  }

  extras.forEach((extra) => {

    let preco = 0;

    let nome_formt = fomatar_nome(extra);

    if (extra === "fritas_m") preco = 13;
    if (extra === "fritas_ame") preco = 15;
    if (extra === "combo_1") preco = 35;
    if (extra === "combo_2") preco = 60;

    carrinho.push({
      tipo: "Extra",
      nome: nome_formt,
      preco: preco
    });

  });

  extras = [];

  divTitleExtras.innerHTML = "";
  divCurrentExtras.innerHTML = "";

  atualizarCarrinho();

  Swal.fire({
    icon: "success",
    title: "Itens extra adicionados",
    timer: 1500,
    showConfirmButton: false
  });

}
