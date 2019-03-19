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
import * as api from '../helpers/api'
import logo from '../logo.svg'
import { 
	pegarUsuarioDaApi,
	pegarUsuarioTipoDaApi,
	pegarSituacaoDaApi,
	pegarCategoriaDaApi,
	pegarEmpresaDaApi,
	pegarEmpresaTipoDaApi,
	pegarContaFixaDaApi,
	pegarLancamentoDaApi,
	pegarLancamentoSituacaoDaApi,
} from '../actions'


class Login extends React.Component {

	state = {
		email: '',
		senha: '',
		mostrarMensagemDeErro: false,
		camposComErro: [],
		carregando: false
	}

	puxarTodosDados(){
		if(this.props.token){
			this.props.pegarUsuarioDaApi(this.props.token)			
			this.props.pegarUsuarioTipoDaApi(this.props.token)
			this.props.pegarSituacaoDaApi(this.props.token)
			this.props.pegarCategoriaDaApi(this.props.token)
			this.props.pegarEmpresaDaApi(this.props.token)
			this.props.pegarEmpresaTipoDaApi(this.props.token)
			this.props.pegarContaFixaDaApi(this.props.token)
			this.props.pegarLancamentoDaApi(this.props.token)
			this.props.pegarLancamentoSituacaoDaApi(this.props.token)
		}
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name
		this.setState({[name]: valor})
	}

	ajudadorDeSubmissao = () => {
		this.setState({loading : true})
		const {
			email,
			senha,
		} = this.state
		let {
			mostrarMensagemDeErro,
			camposComErro,
			loading
		} = this.state
		camposComErro = []

		mostrarMensagemDeErro = false
		if(email === ''){
			loading = false
			mostrarMensagemDeErro = true
			camposComErro.push('email')
		}
		if(senha === ''){
			loading = false
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
					console.log(dados)
					if(!dados.ok){
						mostrarMensagemDeErro = true
						camposComErro.push('naoRegistrado')
						loading = false

						this.setState({
							mostrarMensagemDeErro,
							camposComErro,
							loading
						})
					}
					if(dados.ok){
						let tela = TELA_EXTRATO_EMPRESA
						if(dados.resultado.empresa_id === EMPRESA_ADMINISTRACAO_ID){
							tela = TELA_EXTRATO_ADMINISTRACAO
						}
						this.props.salvarUsuarioLogado(dados.resultado)
						this.puxarTodosDados()
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
						<p>Carregando ... </p>
				}
				{
					!carregando &&
						<div className="login-wrapper">
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
									<Button 
										type='button' 
										loading={this.state.loading}
										spinColor= '#222'
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
		pegarUsuarioDaApi: (elemento) => dispatch(pegarUsuarioDaApi(elemento)),
		pegarUsuarioTipoDaApi: (elemento) => dispatch(pegarUsuarioTipoDaApi(elemento)),
		pegarSituacaoDaApi: (elemento) => dispatch(pegarSituacaoDaApi(elemento)),
		pegarCategoriaDaApi: (elemento) => dispatch(pegarCategoriaDaApi(elemento)),
		pegarEmpresaDaApi: (elemento) => dispatch(pegarEmpresaDaApi(elemento)),
		pegarEmpresaTipoDaApi: (elemento) => dispatch(pegarEmpresaTipoDaApi(elemento)),
		pegarContaFixaDaApi: (elemento) => dispatch(pegarContaFixaDaApi(elemento)),
		pegarLancamentoDaApi: (elemento) => dispatch(pegarLancamentoDaApi(elemento)),
		pegarLancamentoSituacaoDaApi: (elemento) => dispatch(pegarLancamentoSituacaoDaApi(elemento)),
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
