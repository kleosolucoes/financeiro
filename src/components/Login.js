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
import { 
	salvarUsuarioLogado, 
} from '../actions'
import {
	TELA_EXTRATO_ADMINISTRACAO,
	TELA_EXTRATO_EMPRESA,
	EMPRESA_ADMINISTRACAO_ID,
} from '../helpers/constantes'
import * as api from '../helpers/api'

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

			api.login({email, senha})
				.then(dados => {
					if(!dados.ok){
						mostrarMensagemDeErro = true
						camposComErro.push('naoRegistrado')

						this.setState({
							mostrarMensagemDeErro,
							camposComErro,
						})
					}
					if(dados.ok){
						let tela = TELA_EXTRATO_EMPRESA
						if(dados.resultado.empresa_id === EMPRESA_ADMINISTRACAO_ID){
							tela = TELA_EXTRATO_ADMINISTRACAO
						}
						this.props.salvarUsuarioLogado(dados.resultado)
						this.props.alterarTela(tela)
					}
				})
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
			<div>
				<h1>Login</h1>
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
							style={{width: '100%'}} 
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

function mapDispatchToProps(dispatch){
	return {
		salvarUsuarioLogado: (elemento) => dispatch(salvarUsuarioLogado(elemento)),
	}
}

export default connect(null, mapDispatchToProps)(Login)
