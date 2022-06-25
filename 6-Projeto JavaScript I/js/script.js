// 1-Temos que referenciar o input
let input = document.querySelector('input[name=tarefa]');

// 2-Temos que referenciar o button
let btn = document.querySelector('#botao');

// 3-Temos que referenciar a lista
let lista = document.querySelector('#lista');

//Colocando card aqui para ficar global
let card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarTarefas(){
    //Precisamos limpar a listagem de itens antes de renderizar a tela novamente
    lista.innerHTML = '';

    for(tarefa of tarefas){    

        //Criar o item da lista
        let itemLista = document.createElement('li');

        //Adicionar classes no item da lista
        itemLista.setAttribute('class', 'list-group-item list-group-item-action')

        //Adicionar o evento de clique no item da lista
        itemLista.onclick = function(){
            deletarTarefa(this);
        }

        //Criar um texto
        let itemTexto = document.createTextNode(tarefa);

        //Adicionar o texto no item da lista
        itemLista.appendChild(itemTexto);

        //Adicionar o item da lista na lista
        lista.appendChild(itemLista);
    }
}
//Executando a função para renderizar as tarefas
renderizarTarefas();

// 1- Precisamos "escutar" o evento de clique no botão
btn.onclick = function(){
    // 2- Precisamos capturar o valor digitado pelo usuário no input
    let novaTarefa = input.value;

    if(novaTarefa !== ""){
        // 3- Precisamos atualizar a nova tarefa na lista (array) de tarefas e renderizar a tela
        tarefas.push(novaTarefa);

        //Executando a função para renderizar as tarefas
        renderizarTarefas();

        //Limpando o input
        input.value = '';

        //Removendo os Alerts
        removerAlerts();

        //Salvar dados no storage
        salvarDadosNoStorage()
    }else{
        //Removendo os Alerts
        removerAlerts();
        let alert = document.createElement('alert');
        alert.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Por favor informe uma tarefa');

        alert.appendChild(msg);
        card.appendChild(alert);
    }
}

function removerAlerts(){
    let alerts = document.querySelectorAll('alert');

    for(let i = 0; i <alerts.length; i++){
        card.removeChild(alerts[i]);
    }
}

function deletarTarefa(tar){
    //Remove a tarefa do array e não da tela
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    //Redenrizar novamente a tela
    renderizarTarefas();

    //Salvar dados no storage
    salvarDadosNoStorage()
}

function salvarDadosNoStorage(){
    // Todo navegador web possui esta capacidade
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}