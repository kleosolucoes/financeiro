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
