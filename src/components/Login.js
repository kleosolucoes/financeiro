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
import { salvarUsuarioLogado, } from '../actions'
import md5 from 'md5'
import { EMPRESA_ADMINISTRACAO_ID } from '../helpers/constantes'
import logo from '../logo.svg'

class Login extends React.Component {

	state = {
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
			email,
			senha,
		} = this.state
		let {
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		camposComErro = []

		mostrarMensagemDeErro = false
		if(email === ''){
			mostrarMensagemDeErro = true
			camposComErro.push('email')
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

			const usuario = this.props.usuarios
				.find(usuario => usuario.email === email
					&& usuario.senha === md5(senha))
			if(usuario){
				let tela = 'extratoEmpresa'
				if(usuario.empresa_id === EMPRESA_ADMINISTRACAO_ID){
					tela = 'extratoAdministracao'
				}
				this.props.salvarUsuarioLogado({usuario_id: usuario.id})
				this.props.alterarTela(tela)
			}else{
				mostrarMensagemDeErro = true
				camposComErro.push('naoRegistrado')
				this.setState({
					mostrarMensagemDeErro,
					camposComErro,
				})
			}
		}
	}

	render() {
		const {
			email,
			senha,
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state

		return (

			<div className="login-wrapper">
			{/* <h1>Login</h1>
			<p>usuario: falecomleonardopereira@gmail.com - senha: 123</p> */}
			<img src={logo} alt="Financeiro" height="100px" />
				<FormGroup className="style-form">
					<Label for="email">Email</Label>
					<Input 
						className="style-input"
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
				<FormGroup className="style-form">
					<Label for="senha">Senha</Label>
					<Input 
						className="style-input"
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
						camposComErro.includes('naoRegistrado') &&
							<div style={{padding: 10}}>
								<Alert color='warning'>
									Usuário/Senha não conferem
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
							// style={{width: '100%'}} 
							className="style-button-login"
							onClick={this.ajudadorDeSubmissao}
						>
							Entrar
						</button> 
					</Col>
				</Row>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		usuarios: state.usuarios,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarUsuarioLogado: (elemento) => dispatch(salvarUsuarioLogado(elemento)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
