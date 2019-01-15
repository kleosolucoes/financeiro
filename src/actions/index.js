export const PEGAR_LANCAMENTOS = 'PEGAR_LANCAMENTOS'
export const SALVAR_LANCAMENTO = 'SALVAR_LANCAMENTO'
export const PEGAR_CATEGORIAS = 'PEGAR_CATEGORIAS'
export const SALVAR_CATEGORIA = 'SALVAR_CATEGORIA'
export const PEGAR_ENTIDADES = 'PEGAR_ENTIDADES'
export const SALVAR_ENTIDADE = 'SALVAR_ENTIDADE'
export const PEGAR_USUARIOS = 'PEGAR_USUARIOS'
export const SALVAR_USUARIO = 'SALVAR_USUARIO'
export const PEGAR_SITUACOES = 'PEGAR_SITUACOES'
export const PEGAR_LANCAMENTO_SITUACOES = 'PEGAR_LANCAMENTO_SITUACOES'
export const SALVAR_LANCAMENTO_SITUACAO = 'SALVAR_LANCAMENTO_SITUACAO'

export function pegarLancamentos(elementos){ 
	return {
		type: PEGAR_LANCAMENTOS,
		elementos,
	}
}

export function salvarLancamento(elemento, novo = false){ 
	return {
		type: SALVAR_LANCAMENTO,
		elemento,
		novo,
	}
}

export function pegarCategorias(elementos){ 
	return {
		type: PEGAR_CATEGORIAS,
		elementos,
	}
}

export function salvarCategoria(elemento, novo = false){ 
	return {
		type: SALVAR_CATEGORIA,
		elemento,
		novo,
	}
}

export function pegarEntidades(elementos){ 
	return {
		type: PEGAR_ENTIDADES,
		elementos,
	}
}

export function salvarEntidade(elemento, novo = false){ 
	return {
		type: SALVAR_ENTIDADE,
		elemento,
		novo,
	}
}

export function pegarUsuarios(elementos){ 
	return {
		type: PEGAR_USUARIOS,
		elementos,
	}
}

export function salvarUsuario(elemento, novo = false){ 
	return {
		type: SALVAR_USUARIO,
		elemento,
		novo,
	}
}

export function pegarLancamentoSituacoes(elementos){ 
	return {
		type: PEGAR_LANCAMENTO_SITUACOES,
		elementos,
	}
}

export function salvarLancamentoSituacao(elemento, novo = false){ 
	return {
		type: SALVAR_LANCAMENTO_SITUACAO,
		elemento,
		novo,
	}
}

export function pegarSituacoes(elementos){ 
	return {
		type: PEGAR_SITUACOES,
		elementos,
	}
}
