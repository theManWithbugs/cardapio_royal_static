
const divSaboresEspetinho = document.getElementById("sabores_espetinho");
const divCurrentSaborEspet = document.getElementById("current_sabores_espet");

let espetinho = null;

function add_espetinho(tipo) {
  // Mostra os sabores
  divSaboresEspetinho.style.display = "block";
  divCurrentSaborEspet.innerHTML = "";

  let preco = 0;

  if (tipo === "Simples") {preco = 15;}

  if (tipo === "Completo") {preco = 25;}

  // Cria o objeto com o tipo selecionado pelo usuario
  espetinho = {
    tipo: "Espetinho",
    nome: tipo,
    preco: preco,
    sabor: []
  };
}

function adicionarEspetinhoCarrinho() {

  if (!espetinho || espetinho.sabor.length === 0) {

    Swal.fire({
      icon: "warning",
      title: "Ops!",
      text: "Selecione o sabor do espetinho."
    });

    return;
  }

  carrinho.push(espetinho);

  divSaboresEspetinho.style.display = "none";
  divCurrentSaborEspet.innerHTML = "";

  espetinho = null;

  atualizarCarrinho();

  Swal.fire({
    icon: "success",
    title: "Espetinho adicionado!",
    timer: 1500,
    showConfirmButton: false
  });

}

function selec_sab_espet(sabor) {

  if (!espetinho) {

    Swal.fire({
      icon: "warning",
      title: "Atenção",
      text: "Selecione se é simples ou completo primeiro!"
    });

    return;
  }

  if (espetinho.sabor.length >= 1) {

    Swal.fire({
      icon: "error",
      title: "Apenas um sabor por espetinho!"
    });

    return;
  }

  espetinho.sabor.push(sabor);

  // mostra no centro em vermelho
  divCurrentSaborEspet.innerHTML =
    `Sabor selecionado: ${sabor}`;
  divCurrentSaborEspet.classList.add("piscar");

}