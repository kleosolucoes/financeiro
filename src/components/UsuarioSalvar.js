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
import { salvarUsuario, salvarUsuarioSituacao, } from '../actions'
import md5 from 'md5'
import { pegarDataEHoraAtual } from '../helpers/funcoes'

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

			const novoRegistro = true
			const elemento = {
				id: Date.now(),
				data_criacao: pegarDataEHoraAtual()[0],
				hora_criacao: pegarDataEHoraAtual()[1],
				data_inativacao: null,
				hora_inativacao: null,
			}
			elemento.empresa_id = parseInt(this.props.empresa_id)
			elemento.usuario_tipo_id = parseInt(usuario_tipo_id)
			elemento.nome = nome.toUpperCase()
			elemento.email = email.toLowerCase()
			elemento.senha = md5(senha)

			const elementoAssociativo = {
				id: Date.now(),
				data_criacao: pegarDataEHoraAtual()[0],
				hora_criacao: pegarDataEHoraAtual()[1],
				data_inativacao: null,
				hora_inativacao: null,
				situacao_id: 4,  // ativo TODO
				usuario_id: elemento.id,
			}

			this.props.salvarUsuario(elemento, novoRegistro)
			this.props.salvarUsuarioSituacao(elementoAssociativo, novoRegistro)
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
									if(this.props.empresa_id === 1
										&& (usuarioTipo.id === 1 || usuarioTipo.id === 2)){
										mostrar = true
									}
									if(this.props.empresa_id !== 1 
										&& usuarioTipo.id !== 1 
										&& usuarioTipo.id !== 2){
										mostrar = true
									}
									if(mostrar){
										return (
											<option 
												key={usuarioTipo.id}
												value={usuarioTipo.id}
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

function mapStateToProps(state){
	const usuarioLogado = state.usuarioLogado
	const usuario = state.usuarios.find(usuario => usuario.id === usuarioLogado.usuario_id)
	return {
		usuarioTipo: state.usuarioTipo,
		usuarios: state.usuarios,
		empresa_id: usuario.empresa_id,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarUsuario: (elemento, novo) => dispatch(salvarUsuario(elemento, novo)),
		salvarUsuarioSituacao: (elemento, novo) => dispatch(salvarUsuarioSituacao(elemento, novo)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioSalvar)
