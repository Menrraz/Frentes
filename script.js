// Variável para armazenar as prateleiras
let shelves = [];
let cervejaCounter = 1;
let especiaisCounter = 1;

// Função para adicionar uma prateleira
function addShelf() {
  const shelfTypeSelect = document.getElementById('shelf-type');
  const totalFrontsInput = document.getElementById('total-fronts');
  const companyFrontsInput = document.getElementById('company-fronts');

  const shelfType = shelfTypeSelect.value;
  const totalFronts = parseInt(totalFrontsInput.value);
  const companyFronts = parseInt(companyFrontsInput.value);

  // Verificar se os campos estão preenchidos corretamente
  if (isNaN(totalFronts) || isNaN(companyFronts)) {
    alert('Por favor, preencha todos os campos corretamente.');
    return;
  }

  // Verificar se o número de frentes ocupadas pela empresa é válido
  if (companyFronts > totalFronts) {
    alert('O número de frentes ocupadas pela empresa não pode ser maior que o total de frentes.');
    return;
  }

  // Gerar o nome da prateleira automaticamente
  let shelfName = '';
  if (shelfType === 'cerveja') {
    shelfName = `Prateleira Cerveja ${cervejaCounter}`;
    cervejaCounter++;
  } else if (shelfType === 'especiais') {
    shelfName = `Prateleira Especiais ${especiaisCounter}`;
    especiaisCounter++;
  }

  // Criar objeto da prateleira
  const shelf = {
    name: shelfName,
    totalFronts: totalFronts,
    companyFronts: companyFronts
  };

  // Adicionar a prateleira à lista
  shelves.push(shelf);

  // Limpar os campos do formulário
  totalFrontsInput.value = '';
  companyFrontsInput.value = '';

  // Atualizar a exibição das prateleiras
  displayShelves();

  // Atualizar o total de prateleiras
  updateTotal();
}

// Função para calcular a porcentagem de espaço ocupado em cada prateleira
function calculatePercentage(shelf) {
  return (shelf.companyFronts / shelf.totalFronts) * 100;
}

// Função para atualizar o total de prateleiras
function updateTotal() {
  const totalElement = document.getElementById('total');
  const total = shelves.reduce((sum, shelf) => sum + calculatePercentage(shelf), 0) / 100;
  totalElement.textContent = `Total de Prateleiras: ${total.toFixed(1)}`;
}

// Função para exibir as prateleiras na interface
function displayShelves() {
  const shelfList = document.getElementById('shelf-list');
  shelfList.innerHTML = '';

  shelves.forEach((shelf) => {
    const shelfItem = document.createElement('div');
    shelfItem.classList.add('shelf-item');

    const shelfName = document.createElement('h3');
    shelfName.textContent = shelf.name;

    const totalFronts = document.createElement('p');
    totalFronts.textContent = `Total de Frentes: ${shelf.totalFronts}`;

    const companyFronts = document.createElement('p');
    companyFronts.textContent = `Frentes Ocupadas: ${shelf.companyFronts}`;

    const percentage = document.createElement('p');
    percentage.textContent = `Porcentagem: ${calculatePercentage(shelf).toFixed(2)}%`;

    shelfItem.appendChild(shelfName);
    shelfItem.appendChild(totalFronts);
    shelfItem.appendChild(companyFronts);
    shelfItem.appendChild(percentage);

    shelfList.appendChild(shelfItem);
  });
}

// Adicionar evento de clique ao botão "Adicionar Prateleira"
const addShelfButton = document.getElementById('add-shelf');
addShelfButton.addEventListener('click', addShelf);