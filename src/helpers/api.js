const api = 'https://glacial-harbor-83832.herokuapp.com'

const headers = {
	'Content-Type': 'application/json'
}

export const teste = () => 
	fetch(`${api}/usuario/teste`)
		.then(resultado => resultado.json())
		.then(json => json)

export const login = (dados) =>
	fetch(
		`${api}/usuario/login`,
		{
			headers,
			method: "POST",
			body: JSON.stringify(dados),
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const usuarios = (token) =>
	fetch(
		`${api}/usuario/todos`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const usuarioTipo = (token) =>
	fetch(
		`${api}/usuario/usuarioTipo`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const situacao = (token) =>
	fetch(
		`${api}/situacao/todos`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const categoria = (token) =>
	fetch(
		`${api}/categoria/todos`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const usuarioSituacao = (token) =>
	fetch(
		`${api}/usuario/usuarioSituacao`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const empresas = (token) =>
	fetch(
		`${api}/empresa/todos`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const empresaTipo = (token) =>
	fetch(
		`${api}/empresa/empresaTipo`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const contaFixa = (token) =>
	fetch(
		`${api}/empresa/contaFixa`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const lancamento = (token) =>
	fetch(
		`${api}/empresa/lancamento`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)

export const lancamentoSituacao = (token) =>
	fetch(
		`${api}/empresa/lancamentoSituacao`,
		{
			headers: {
				...headers, 
				'x-access-token': token,
			},
			method: "GET",
		}
	)
		.then(resultado => resultado.json())
		.then(json => json)
