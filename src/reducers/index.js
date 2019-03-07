import { combineReducers } from 'redux'
import {
	PEGAR_SITUACOES, 
	PEGAR_LANCAMENTOS, 
	SALVAR_LANCAMENTO,
	PEGAR_LANCAMENTO_SITUACAO,
	SALVAR_LANCAMENTO_SITUACAO,
	PEGAR_USUARIOS,
	SALVAR_USUARIO,
	PEGAR_USUARIO_SITUACAO,
	SALVAR_USUARIO_SITUACAO,
	PEGAR_USUARIO_TIPO,
	PEGAR_CATEGORIAS,
	SALVAR_CATEGORIA,
	PEGAR_EMPRESAS,
	SALVAR_EMPRESA,
	PEGAR_EMPRESA_TIPO,
	PEGAR_CONTA_FIXA,
	SALVAR_CONTA_FIXA,
	PEGAR_USUARIO_LOGADO,
	SALVAR_USUARIO_LOGADO,
} from '../actions'

const stateCategorias = [
	{
		id: 1,
		nome: 'Dízimo Dinheiro',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 2,
		nome: 'Dízimo Débito',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 3,
		nome: 'Dízimo Crédito',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 4,
		nome: 'Dízimo Moeda',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 5,
		nome: 'Oferta Dinheiro',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 6,
		nome: 'Oferta Débito',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 7,
		nome: 'Oferta Crédito',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 8,
		nome: 'Oferta Moeda',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 9,
		nome: 'Oferta Especial Dinheiro',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 10,
		nome: 'Oferta Especial Débito',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 11,
		nome: 'Oferta Especial Crédito',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 12,
		nome: 'Oferta Especial Moeda',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'C',
	},
	{
		id: 13,
		nome: 'Aluguel',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'D',
	},
	{
		id: 14,
		nome: 'Conta de Água',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'D',
	},
	{
		id: 15,
		nome: 'Conta de Luz',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		credito_debito: 'D',
	},
]

const stateEmpresaTipo = [
	{
		id: 1,
		nome: 'Administracao',
		data_criacao: '16/02/2019',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 2,
		nome: 'Igreja',
		data_criacao: '16/02/2019',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
]

const stateEmpresas = [
	{
		id: 1,
		empresa_tipo_id: 1,
		nome: 'Administração',
		usuario_id: 2,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 2,
		empresa_tipo_id: 2,
		nome: 'Ceilandia',
		usuario_id: 2,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 3,
		empresa_tipo_id: 2,
		nome: 'Sudoeste',
		usuario_id: 2,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 4,
		empresa_tipo_id: 2,
		nome: 'Anirqueira',
		usuario_id: 2,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
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
		nome: 'Jaspio Pereira Magalhães',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 2,
		empresa_id: 2,
		usuario_tipo_id: 2,
		email: 'ivan@gmail.com',
		senha: '123',
		nome: 'Ivan Tavares',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
]

const stateUsuarioSituacao = [
	{
		id: 1,
		usuario_id: 1,
		situacao_id: 4,
		quem_id: 1,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 2,
		usuario_id: 2,
		situacao_id: 5,
		quem_id: 1,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	}
]

const stateUsuarioTipo = [
	{
		id: 1,
		nome: 'Administrador',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 2,
		nome: 'Aceitar Lançamento',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 3,
		nome: 'Lançar Culto da Igreja',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
]

const stateLancamentos = [
	{
		id: 1,
		data_criacao: '16/12/2018',
		data: '22/11/2019',
		valor: '100.00',
		taxa: '0.00',
		categoria_id: 1,
		usuario_id: 2,
		empresa_id: 1,
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		descricao: '',
	},
	{
		id: 2,
		data_criacao: '16/12/2018',
		data: '22/11/2019',
		valor: '100.00',
		taxa: '0.00',
		categoria_id: 2,
		usuario_id: 2,
		empresa_id: 1,
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		descricao: '',
	},
	{
		id: 3,
		data_criacao: '16/12/2018',
		data: '22/11/2019',
		valor: '100.00',
		taxa: '0.00',
		categoria_id: 6,
		usuario_id: 2,
		empresa_id: 1,
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		descricao: '',
	},
	{
		id: 4,
		data_criacao: '16/12/2018',
		data: '22/11/2019',
		valor: '100.00',
		taxa: '0.00',
		categoria_id: 8,
		usuario_id: 2,
		empresa_id: 1,
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		descricao: '',
	},
	{
		id: 5,
		data_criacao: '16/12/2018',
		data: '22/11/2019',
		valor: '100.00',
		taxa: '0.00',
		categoria_id: 11,
		usuario_id: 2,
		empresa_id: 1,
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		descricao: '',
	},
]

const stateSituacoes = [
	{
		id: 1,
		nome: 'Recebido',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 2,
		nome: 'Não Recebido',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 3,
		nome: 'Recusado',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 4,
		nome: 'Ativo',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 5,
		nome: 'Inativo',
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
]

const stateLancamentoSituacao = [
	{
		id: 1,
		lancamento_id: 1,
		situacao_id: 2,
		usuario_id: 2,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: '00:00:01',
		data_inativacao: '2019-02-25',
	},
	{
		id: 2,
		lancamento_id: 1,
		situacao_id: 1,
		usuario_id: 2,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: '00:00:01',
		data_inativacao: '2019-02-25',
	},
	{
		id: 3,
		lancamento_id: 1,
		situacao_id: 1,
		usuario_id: 2,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: '00:00:01',
		data_inativacao: '2019-02-25',
	},
	{
		id: 4,
		lancamento_id: 1,
		situacao_id: 3,
		usuario_id: 2,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 5,
		lancamento_id: 2,
		situacao_id: 1,
		usuario_id: 2,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 6,
		lancamento_id: 3,
		situacao_id: 2,
		usuario_id: 2,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 7,
		lancamento_id: 4,
		situacao_id: 1,
		usuario_id: 2,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
	{
		id: 8,
		lancamento_id: 5,
		situacao_id: 1,
		usuario_id: 2,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
	},
]

const stateContaFixa = [
	{
		id: 1,
		empresa_id: 1,
		categoria_id: 2,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		dia_gerar: 1,
		dia_notificacao: 5,
		usuario_id: 2,
		quem_inativou_id: null,
	},
	{
		id: 2,
		empresa_id: 1,
		categoria_id: 2,
		data_criacao: '16/12/2018',
		hora_criacao: '00:00:01',
		hora_inativacao: null,
		data_inativacao: null,
		dia_gerar: 1,
		dia_notificacao: 7,
		usuario_id: 2,
		quem_inativou_id: null,
	},
]

const stateUsuarioLogado = {
	usuario_id: 1,
	//usuario_id: null,
}

function empresaTipo(state = stateEmpresaTipo, action){
	switch(action.type){
		case PEGAR_EMPRESA_TIPO:
			return [...state, ...action.elementos]
		default:
			return state
	}
}

function empresas(state = stateEmpresas, action){
	switch(action.type){
		case PEGAR_EMPRESAS:
			return [...state, ...action.elementos]
		case SALVAR_EMPRESA:
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

function contaFixa(state = stateContaFixa, action){
	switch(action.type){
		case PEGAR_CONTA_FIXA:
			return [...state, ...action.elementos]
		case SALVAR_CONTA_FIXA:
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

function usuarioTipo(state = stateUsuarioTipo, action){
	switch(action.type){
		case PEGAR_USUARIO_TIPO:
			return [...state, ...action.elementos]
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

function usuarioSituacao(state = stateUsuarioSituacao, action){
	switch(action.type){
		case PEGAR_USUARIO_SITUACAO:
			return [...state, ...action.elementos]
		case SALVAR_USUARIO_SITUACAO:
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
		case PEGAR_LANCAMENTO_SITUACAO:
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

function usuarioLogado(state = stateUsuarioLogado, action){
	switch(action.type){
		case PEGAR_USUARIO_LOGADO:
			return [...state]
		case SALVAR_USUARIO_LOGADO:
			return [...state, action.elemento]
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
	usuarioLogado
})
