import React from 'react'
import {
	Row,
	Col,
	FormGroup,
	Label,
	Input,
	Alert,
} from 'reactstrap'
import { connect } from 'react-redux'
import { salvarUsuarioNaApi, } from '../actions'
import { 
	EMPRESA_ADMINISTRACAO_ID,
	USUARIO_TIPO_ADMINISTRACAO,
	USUARIO_TIPO_ACEITAR_LANCAMENTO,
} from '../helpers/constantes'

class UsuarioSalvar extends React.Component {

	state = {
		usuario_tipo_id: 0,
		nome: '',
		email: '',
		senha: '',
		mostrarMensagemDeErro: false,
		camposComErro: [],
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name
		this.setState({[name]: valor})
	}

	ajudadorDeSubmissao = () => {
		const {
			usuario_tipo_id,
			nome,
			email,
			senha,
		} = this.state
		let {
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		const {
			usuarioLogado,
		} = this.props
		camposComErro = []

		mostrarMensagemDeErro = false
		if(parseInt(usuario_tipo_id) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('usuario_tipo_id')
		}
		if(nome === ''){
			mostrarMensagemDeErro = true
			camposComErro.push('nome')
		}
		if(email === ''){
			mostrarMensagemDeErro = true
			camposComErro.push('email')
		}else{
			if(this.props.usuarios.find(usuario => usuario.email === email)){
				mostrarMensagemDeErro = true
				camposComErro.push('emailJaUtilizado')
			}
		}
		if(senha === ''){
			mostrarMensagemDeErro = true
			camposComErro.push('senha')
		}

		if(mostrarMensagemDeErro){
			this.setState({
				mostrarMensagemDeErro,
				camposComErro,
			})
		}else{
			this.setState({
				mostrarMensagemDeErro: false,
				camposComErro: [],
			})

			const elemento = {}
			elemento.empresa_id = this.props.empresa_id
			elemento.usuario_tipo_id = usuario_tipo_id
			elemento.nome = nome.toUpperCase()
			elemento.email = email.toLowerCase()
			elemento.senha = senha

			this.props.salvarUsuarioNaApi(elemento, usuarioLogado.token)
			this.props.alternarMostrarSalvarUsuario()
			alert('Usuário Salvo com sucesso!')
		}
	}

	render() {
		const {
			usuario_tipo_id,
			nome,
			email,
			senha,
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		const {
			usuarioTipo,
		} = this.props

		return (
			<div>
				<h1>Adicionar Usuário</h1>
				<FormGroup>
					<Label for="usuario_tipo_id">Tipo</Label>
					<Input 
						type="select" 
						name="usuario_tipo_id" 
						id="usuario_tipo_id" 
						value={usuario_tipo_id} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('usuario_tipo_id') ? true : null}
					>
						<option value='0'>Selecione</option>
						{
							usuarioTipo &&
								usuarioTipo.map(usuarioTipo => {
									let mostrar = false
									if(this.props.empresa_id === EMPRESA_ADMINISTRACAO_ID
										&& (usuarioTipo._id === USUARIO_TIPO_ADMINISTRACAO || usuarioTipo._id === USUARIO_TIPO_ACEITAR_LANCAMENTO)){
										mostrar = true
									}
									if(this.props.empresa_id !== EMPRESA_ADMINISTRACAO_ID
										&& usuarioTipo._id !== USUARIO_TIPO_ADMINISTRACAO
										&& usuarioTipo._id !== USUARIO_TIPO_ACEITAR_LANCAMENTO){
										mostrar = true
									}
									if(mostrar){
										return (
											<option 
												key={usuarioTipo._id}
												value={usuarioTipo._id}
											>
												{usuarioTipo.nome}
											</option>
										)
									}
									return false
								})
						}
					</Input>
					{camposComErro.includes('usuario_tipo_id') && <Alert color='danger'>Selecione um Tipo</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="nome">Nome</Label>
					<Input 
						type="text" 
						name="nome" 
						id="nome" 
						value={nome} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('nome') ? true : null}
					>
					</Input>
					{camposComErro.includes('nome') && <Alert color='danger'>Preencha o Nome</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="email">Email</Label>
					<Input 
						type="email" 
						name="email" 
						id="email" 
						value={email} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('email') ? true : null}
					>
					</Input>
					{camposComErro.includes('email') && <Alert color='danger'>Preencha o Email</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="senha">Senha</Label>
					<Input 
						type="password" 
						name="senha" 
						id="senha" 
						value={senha} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('senha') ? true : null}
					>
					</Input>
					{camposComErro.includes('senha') && <Alert color='danger'>Preencha a Senha</Alert>}
				</FormGroup>
				<Row style={{padding: 5}}>
					{
						camposComErro.includes('emailJaUtilizado') &&
							<div style={{padding: 10}}>
								<Alert color='warning'>
									Email já utilizado
								</Alert>
							</div>
					}
					{
						mostrarMensagemDeErro &&
							<div style={{padding: 10}}>
								<Alert color='warning'>
									Campos inválidos
								</Alert>
							</div>
					}
					<Col>
						<button 
							type='button' 
							style={{width: '100%'}} 
							onClick={this.props.alternarMostrarSalvarUsuario}
						>
							Voltar
						</button> 
					</Col>
					<Col>
						<button 
							type='button' 
							style={{width: '100%'}} 
							onClick={this.ajudadorDeSubmissao}
						>
							Adicionar
						</button> 
					</Col>
				</Row>
			</div>
		)
	}
}

function mapStateToProps({usuarios, usuarioTipo, usuarioLogado}){
	return {
		usuarioTipo,
		usuarios,
		usuarioLogado,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarUsuarioNaApi: (elemento, token) => dispatch(salvarUsuarioNaApi(elemento, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioSalvar)
