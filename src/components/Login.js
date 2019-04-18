import React from 'react'
import {
	Row,
	Col,
	FormGroup,
	Label,
	Input,
	Alert,
	Button,
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
import logo from '../caixa.png'
import * as api from '../helpers/api'
import firebase from 'firebase'

class Login extends React.Component {

	state = {
		email: '',
		senha: '',
		mostrarMensagemDeErro: false,
		camposComErro: [],
		carregando: false
	}

	askForPermissioToReceiveNotifications = async () => {
		try {
			const messaging = firebase.messaging();
			await messaging.requestPermission();
			const token = await messaging.getToken();
			console.log('token do usuário:', token);

			return token;
		} catch (error) {
			console.error(error);
		}
	}

	notificar = () => {
		const url = 'https://fcm.googleapis.com/fcm/send'
		const dados = {
			"notification": {
				"title": "Firebase",
				"body": "Firebase is awesome",
				"click_action": "http://localhost:3000/",
				"icon": "http://url-to-an-icon/icon.png"
			},
			"to": "cXMyNCb15nY:APA91bHjp_i9yoxAFm5Y6SYzx7nEcIZhqALP89MKD-R-Y-FTA0UoboxNFEubwnBBBkXSLmCL1ioEIfD6yqSzTy0nnVGnpJhchNOKLSbYCX9Tg0XF0H5LHP1d-WOF6xQMNU-QDnWpHWP0"
		}
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': 'key=AAAAaxLu8dw:APA91bHkcGqxMUG4QDK03goQqSR8YVLahDbenU-pCIDOIJtidCsOrMzWR4XBRl-F7kwkVcd8K4z5krj8cOnkrs_WkncFeqiN3m1aP77lRFIo2BeLGhsNYQf5xwugteZ4FH0oggj7zDks'
		}

		fetch(
			url,
			{
				headers,
				method: "POST",
				body: JSON.stringify(dados),
			}
		)
			.then(resultado => resultado.json())
			.then(json => json)

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
				carregando: true,
			})

			api.login({email, senha})
				.then(dados => {
					if(!dados.ok){
						mostrarMensagemDeErro = true
						camposComErro.push('naoRegistrado')

						this.setState({
							mostrarMensagemDeErro,
							camposComErro,
							carregando: false,
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
			carregando,
		} = this.state

		return (
			<div>
				{
					carregando &&
						<Alert color='info' className='text-center'>
							Carregando ... 
						</Alert>
				}
				{
					!carregando &&
						<div className="login-wrapper">
							<button
								onClick={()=>this.askForPermissioToReceiveNotifications()}
							>
							permissao
							</button>
							<button
								onClick={()=>this.notificar()}
							>
							notificar
							</button>
	
						<img src={logo} width="160px" height="130px" />
							{/* <h1>
								Financeiro	
							</h1> */}
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
									<Button 
										type='button' 
										className="style-button-login"
										onClick={this.ajudadorDeSubmissao}
									>
										Entrar
									</Button> 
								</Col>
							</Row>
						</div>
				}
			</div>
		)
	}
}

function mapStateToProps({usuarioLogado}){
	return{
		token: usuarioLogado && usuarioLogado.token,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarUsuarioLogado: (elemento) => dispatch(salvarUsuarioLogado(elemento)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
