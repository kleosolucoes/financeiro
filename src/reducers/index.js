import { combineReducers } from 'redux'
import {
	PEGAR_LANCAMENTOS,
	SALVAR_LANCAMENTO,
	PEGAR_CATEGORIAS,
	SALVAR_CATEGORIA,
	PEGAR_ENTIDADES,
	SALVAR_ENTIDADE,
	PEGAR_USUARIOS,
	SALVAR_USUARIO,
	PEGAR_SITUACOES,
	PEGAR_LANCAMENTO_SITUACOES,
	SALVAR_LANCAMENTO_SITUACAO,
} from '../actions'

const stateCategorias = [
	{
		id: 1,
		nome: 'Categoria 1',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 2,
		nome: 'Categoria 2',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 3,
		nome: 'Categoria 3',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 4,
		nome: 'Categoria 4',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
]

const stateEntidadesTipo = [
	{
		id: 1,
		nome: 'EMPRESA',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 2,
		nome: 'CLIENTE',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 3,
		nome: 'FORNECEDOR',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
]

const stateEntidades = [
	{
		id: 1,
		entidade_tipo_id: 1,
		nome: 'Entidade 1',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 2,
		entidade_tipo_id: 2,
		nome: 'Entidade 2',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 3,
		entidade_tipo_id: 3,
		nome: 'Entidade 3',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 4,
		entidade_tipo_id: 3,
		nome: 'Entidade 4',
		data_criacao: '2018-12-16',
		data_inativacao: null,
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
		data_inativacao: null,
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
		entidade_id: 1,
		data_inativacao: null,
	},
	{
		id: 2,
		data_criacao: '2018-12-16',
		valor: 100.00,
		categoria_id: 1,
		credito_debito: 'C',
		usuario_id: 1,
		entidade_id: 1,
		data_inativacao: null,
	},
	{
		id: 3,
		data_criacao: '2018-12-16',
		valor: 100.00,
		categoria_id: 4,
		credito_debito: 'D',
		usuario_id: 1,
		entidade_id: 2,
		data_inativacao: null,
	},
	{
		id: 4,
		data_criacao: '2018-12-16',
		valor: 100.00,
		categoria_id: 2,
		credito_debito: 'D',
		usuario_id: 1,
		entidade_id: 1,
		data_inativacao: null,
	},
	{
		id: 5,
		data_criacao: '2018-12-16',
		valor: 100.00,
		categoria_id: 3,
		credito_debito: 'D',
		usuario_id: 1,
		entidade_id: 4,
		data_inativacao: null,
	},
]

const stateSituacoes = [
	{
		id: 1,
		nome: 'Pendente',
		data_criacao: '2018-12-16',
	},
	{
		id: 2,
		nome: 'Aceito',
		data_criacao: '2018-12-16',
	},
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
		case PEGAR_ENTIDADES:
			return [...state, ...action.elementos]
		case SALVAR_ENTIDADE:
			if(action.novo){
				return [...state, action.elemento]
			}else{
				const estadoAtualizado = state.map(elemento => {
					if(elemento.id === action.elemento.id){
						return action.elemento
					}else{
						return elemento
					}
				})
				return [...estadoAtualizado]
			}
		default:
			return state
	}
}

function categorias(state = stateCategorias, action){
	switch(action.type){
		case PEGAR_CATEGORIAS:
			return [...state, ...action.elementos]
		case SALVAR_CATEGORIA:
			if(action.novo){
				return [...state, action.elemento]
			}else{
				const estadoAtualizado = state.map(elemento => {
					if(elemento.id === action.elemento.id){
						return action.elemento
					}else{
						return elemento
					}
				})
				return [...estadoAtualizado]
			}
		default:
			return state
	}
}

function lancamentos(state = stateLancamentos, action){
	switch(action.type){
		case PEGAR_LANCAMENTOS:
			return [...state, ...action.elementos]
		case SALVAR_LANCAMENTO:
			if(action.novo){
				return [...state, action.elemento]
			}else{
				const estadoAtualizado = state.map(elemento => {
					if(elemento.id === action.elemento.id){
						return action.elemento
					}else{
						return elemento
					}
				})
				return [...estadoAtualizado]
			}
		default:
			return state
	}
}

function usuarios(state = stateUsuarios, action){
	switch(action.type){
		case PEGAR_USUARIOS:
			return [...state, ...action.elementos]
		case SALVAR_USUARIO:
			if(action.novo){
				return [...state, action.elemento]
			}else{
				const estadoAtualizado = state.map(elemento => {
					if(elemento.id === action.elemento.id){
						return action.elemento
					}else{
						return elemento
					}
				})
				return [...estadoAtualizado]
			}
		default:
			return state
	}
}

function situacoes(state = stateSituacoes, action){
	switch(action.type){
		case PEGAR_SITUACOES:
			return [...state, ...action.elementos]
		default:
			return state
	}
}

function lancamentoSituacao(state = stateLancamentoSituacao, action){
	switch(action.type){
		case PEGAR_LANCAMENTO_SITUACOES:
			return [...state, ...action.elementos]
		case SALVAR_LANCAMENTO_SITUACAO:
			if(action.novo === true){
				return [...state, action.elemento]
			}else{
				const estadoAtualizado = state.map(elemento => {
					if(elemento.id === action.elemento.id){
						return action.elemento
					}else{
						return elemento
					}
				})
				return [...estadoAtualizado]
			}
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
