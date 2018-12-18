import { combineReducers } from 'redux'

const stateCategorias = [
	{
		id: 1,
		nome: 'Categoria 1',
		data_criacao: '2018-12-16',
	},
	{
		id: 2,
		nome: 'Categoria 2',
		data_criacao: '2018-12-16',
	},
	{
		id: 3,
		nome: 'Categoria 3',
		data_criacao: '2018-12-16',
	},
	{
		id: 4,
		nome: 'Categoria 4',
		data_criacao: '2018-12-16',
	},
]

const stateEntidadesTipo = [
	{
		id: 1,
		nome: 'EMPRESA',
		data_criacao: '2018-12-16',
	},
	{
		id: 2,
		nome: 'CLIENTE',
		data_criacao: '2018-12-16',
	},
	{
		id: 3,
		nome: 'FORNECEDOR',
		data_criacao: '2018-12-16',
	},
]

const stateEntidades = [
	{
		id: 1,
		entidade_tipo_id: '1',
		nome: 'Entidade 1',
		data_criacao: '2018-12-16',
	},
	{
		id: 2,
		entidade_tipo_id: '2',
		nome: 'Entidade 2',
		data_criacao: '2018-12-16',
	},
	{
		id: 3,
		entidade_tipo_id: '3',
		nome: 'Entidade 3',
		data_criacao: '2018-12-16',
	},
	{
		id: 4,
		entidade_tipo_id: '3',
		nome: 'Entidade 4',
		data_criacao: '2018-12-16',
	},
]

const stateUsuarios = [
	{
		id: 1,
		email: 'falecomleonardopereira@gmail.com',
		senha: '123',
		nome: 'Leonardo Pereira Magalhães',
		nivel: 1,
		data_criacao: '2018-12-16',
	},
]

const stateLancamentos = [
	{
		id: 1,
		data_criacao: '2018-12-16',
		valor: 100.00,
		categoria_id: 1,
		credito_debito: 'C',
		usuario_id: 1,
		entidade_id: 1
	},
	{
		id: 2,
		data_criacao: '2018-12-16',
		valor: 100.00,
		categoria_id: 1,
		credito_debito: 'C',
		usuario_id: 1,
		entidade_id: 1
	},
	{
		id: 3,
		data_criacao: '2018-12-16',
		valor: 100.00,
		categoria_id: 4,
		credito_debito: 'D',
		usuario_id: 1,
		entidade_id: 2
	},
	{
		id: 4,
		data_criacao: '2018-12-16',
		valor: 100.00,
		categoria_id: 2,
		credito_debito: 'D',
		usuario_id: 1,
		entidade_id: 1
	},
	{
		id: 5,
		data_criacao: '2018-12-16',
		valor: 100.00,
		categoria_id: 3,
		credito_debito: 'D',
		usuario_id: 1,
		entidade_id: 4
	},
]

const stateSituacoes = [
	{
		id: 1,
		name: 'Pendente',
		data_criacao: '2018-12-16',
	},
	{
		id: 2,
		name: 'Aceito',
		data_criacao: '2018-12-16',
	},
	{
		id: 3,
		name: 'Recusado',
		data_criacao: '2018-12-16',
	}
]

const stateLancamentoSituacao = [
	{
		id: 1,
		lancamento_id: 1,
		situacao_id: 1,
		data_criacao: '2018-12-16',
	},
]

function entidadesTipo(state = stateEntidadesTipo, action){
	switch(action.type){
		default:
			return state
	}
}

function entidades(state = stateEntidades, action){
	switch(action.type){
		default:
			return state
	}
}

function categorias(state = stateCategorias, action){
	switch(action.type){
		default:
			return state
	}
}

function lancamentos(state = stateLancamentos, action){
	switch(action.type){
		default:
			return state
	}
}

function usuarios(state = stateUsuarios, action){
	switch(action.type){
		default:
			return state
	}
}

function situacoes(state = stateSituacoes, action){
	switch(action.type){
		default:
			return state
	}
}

function lancamentoSituacao(state = stateLancamentoSituacao, action){
	switch(action.type){
		default:
			return state
	}
}

export default combineReducers({
	entidadesTipo,
	entidades,
	categorias,
	lancamentos,
	usuarios,
	situacoes,
	lancamentoSituacao,
})
