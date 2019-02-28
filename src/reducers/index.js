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
		nome: 'Dízimo Dinheiro',
		data_criacao: '2018-12-16',
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 2,
		nome: 'Dízimo Débito',
		data_criacao: '2018-12-16',
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 3,
		nome: 'Dízimo Crédito',
		data_criacao: '2018-12-16',
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 4,
		nome: 'Dízimo Moeda',
		data_criacao: '2018-12-16',
		data_inativacao: null,
		credito_debito: 'C',
	},

	{
		id: 5,
		nome: 'Oferta Dinheiro',
		data_criacao: '2018-12-16',
		data_inativacao: null,
		credito_debito: 'C',
	},

	{
		id: 6,
		nome: 'Oferta Débito',
		data_criacao: '2018-12-16',
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 7,
		nome: 'Oferta Crédito',
		data_criacao: '2018-12-16',
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 8,
		nome: 'Oferta Moeda',
		data_criacao: '2018-12-16',
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 9,
		nome: 'Aluguel',
		data_criacao: '2018-12-16',
		data_inativacao: null,
		credito_debito: 'D',
	},
	{
		id: 10,
		nome: 'Conta de Água',
		data_criacao: '2018-12-16',
		data_inativacao: null,
		credito_debito: 'D',
	},
	{
		id: 11,
		nome: 'Conta de Luz',
		data_criacao: '2018-12-16',
		data_inativacao: null,
		credito_debito: 'D',
	},
]

const stateEmpresaTipo = [
	{
		id: 1,
		nome: 'Administracao',
		data_criacao: '2019-02-16',
		data_inativacao: null,
	},
	{
		id: 2,
		nome: 'Igreja',
		data_criacao: '2019-02-16',
		data_inativacao: null,
	},
]

const stateEmpresas = [
	{
		id: 1,
		empresa_tipo_id: 1,
		nome: 'Administração',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 2,
		empresa_tipo_id: 2,
		nome: 'Ceilandia',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 3,
		empresa_tipo_id: 2,
		nome: 'Sudoeste',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 4,
		empresa_tipo_id: 2,
		nome: 'Anirqueira',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
]

const stateUsuarios = [
	{
		id: 1,
		empresa_id: 1,
		usuario_tipo_id: 1,
		email: 'falecomleonardopereira@gmail.com',
		senha: '123',
		nome: 'Leonardo Pereira Magalhães',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 2,
		empresa_id: 2,
		usuario_tipo_id: 2,
		email: 'ivan@gmail.com',
		senha: '123',
		nome: 'Ivan Tavares',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
]

const stateUsuarioSituacao = [
	{
		id: 1,
		usuario_id: 1,
		situacao_id: 4,
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 2,
		usuario_id: 2,
		situacao_id: 5,
		data_criacao: '2018-12-16',
		data_inativacao: null,
	}
]

const stateUsuarioTipo = [
	{
		id: 1,
		nome: 'Aceitar',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 2,
		nome: 'Administrador',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 3,
		nome: 'Lançar Igreja',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
]

const stateLancamentos = [
	{
		id: 1,
		data_criacao: '2018-12-16',
		data: '22/11/2019',
		valor: '100.00',
		taxa: '0.00',
		categoria_id: 1,
		usuario_id: 1,
		empresa_id: 1,
		data_inativacao: null,
	},
	{
		id: 2,
		data_criacao: '2018-12-16',
		data: '22/11/2019',
		valor: '100.00',
		taxa: '0.00',
		categoria_id: 2,
		usuario_id: 1,
		empresa_id: 1,
		data_inativacao: null,
	},
	{
		id: 3,
		data_criacao: '2018-12-16',
		data: '22/11/2019',
		valor: '100.00',
		taxa: '0.00',
		categoria_id: 6,
		usuario_id: 1,
		empresa_id: 1,
		data_inativacao: null,
	},
	{
		id: 4,
		data_criacao: '2018-12-16',
		data: '22/11/2019',
		valor: '100.00',
		taxa: '0.00',
		categoria_id: 8,
		usuario_id: 2,
		empresa_id: 1,
		data_inativacao: null,
	},
	{
		id: 5,
		data_criacao: '2018-12-16',
		data: '22/11/2019',
		valor: '100.00',
		taxa: '0.00',
		categoria_id: 11,
		usuario_id: 2,
		empresa_id: 1,
		data_inativacao: null,
	},
]

const stateSituacoes = [
	{
		id: 1,
		nome: 'Recebido',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 2,
		nome: 'Não Recebido',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 3,
		nome: 'Recusado',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 4,
		nome: 'Ativo',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 5,
		nome: 'Inativo',
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
]

const stateLancamentoSituacao = [
	{
		id: 1,
		lancamento_id: 1,
		situacao_id: 2,
		usuario_id: 2,
		data_criacao: '2018-12-16',
		data_inativacao: '2019-02-25',
	},
	{
		id: 2,
		lancamento_id: 1,
		situacao_id: 1,
		usuario_id: 2,
		data_criacao: '2018-12-16',
		data_inativacao: '2019-02-25',
	},
	{
		id: 3,
		lancamento_id: 1,
		situacao_id: 1,
		usuario_id: 2,
		data_criacao: '2018-12-16',
		data_inativacao: '2019-02-25',
	},
	{
		id: 4,
		lancamento_id: 1,
		situacao_id: 3,
		usuario_id: 2,
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 5,
		lancamento_id: 2,
		situacao_id: 1,
		usuario_id: 2,
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 6,
		lancamento_id: 3,
		situacao_id: 2,
		usuario_id: 2,
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 7,
		lancamento_id: 4,
		situacao_id: 1,
		usuario_id: 2,
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
	{
		id: 8,
		lancamento_id: 5,
		situacao_id: 1,
		usuario_id: 2,
		data_criacao: '2018-12-16',
		data_inativacao: null,
	},
]

const stateContaFixa = [
	{
		id: 1,
		empresa_id: 1,
		categoria_id: 2,
		data_criacao: '2018-12-16',
		data_inativacao: null,
		dia_gerar: 1,
		dia_notificacao: 5,
	},
	{
		id: 2,
		empresa_id: 1,
		categoria_id: 2,
		data_criacao: '2018-12-16',
		data_inativacao: null,
		dia_gerar: 1,
		dia_notificacao: 7,
	},
]

function empresaTipo(state = stateEmpresaTipo, action){
	switch(action.type){
		default:
			return state
	}
}

function empresas(state = stateEmpresas, action){
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

function contaFixa(state = stateContaFixa, action){
	switch(action.type){
		default:
			return state
	}
}

function usuarioSituacao(state = stateUsuarioSituacao, action){
	switch(action.type){
		default:
			return state
	}
}

function usuarioTipo(state = stateUsuarioTipo, action){
	switch(action.type){
		default:
			return state
	}
}

export default combineReducers({
	empresaTipo,
	empresas,
	categorias,
	lancamentos,
	usuarios,
	situacoes,
	lancamentoSituacao,
	contaFixa,
	usuarioTipo,
	usuarioSituacao,
})
