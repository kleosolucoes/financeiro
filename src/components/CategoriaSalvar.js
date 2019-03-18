import React from 'react'
import {
	Row,
	Col,
	FormGroup,
	Label,
	Input,
	Alert,
	Button
} from 'reactstrap'
import { connect } from 'react-redux'
import { salvarCategoriaNaApi } from '../actions'

class CategoriaSalvar extends React.Component {

	state = {
		nome: '',
		credito_debito: 0,
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
			nome,
			credito_debito,
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
		if(nome === ''){
			mostrarMensagemDeErro = true
			camposComErro.push('nome')
		}

		if(parseInt(credito_debito) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('credito_debito')
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
			elemento.credito_debito = credito_debito
			elemento.nome = nome
			this.props.salvarCategoriaNaApi(elemento, usuarioLogado.token)
			this.props.alternarMostrarAdicionar()
			alert('Categoria Salva com sucesso!')
		}
	}

	render() {
		const {
			nome,
			credito_debito,
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		return (
			<div>
				<h1>Adicionar Categoria</h1>
				<FormGroup>
					<Label for="valor">Nome</Label>
					<Input 
						type="text" 
						name="nome" 
						id="nome" 
						value={nome} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('nome') ? true : null}
					>
					</Input>
					{camposComErro.includes('nome') && <Alert color='danger'>Preencha o nome</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="credito_debito">Crédito/Débito</Label>
					<Input 
						type="select" 
						name="credito_debito" 
						id="credito_debito" 
						value={credito_debito} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('credito_debito') ? true : null}
					>
						<option value='0'>Selecione</option>
						<option value='C'>Crédito</option>
						<option value='D'>Débito</option>
					</Input>
					{camposComErro.includes('credito_debito') && <Alert color='danger'>Selecione o Tipo</Alert>}
				</FormGroup>
				<Row style={{padding: 5}}>
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
							style={{width: '100%'}} 
							onClick={this.props.alternarMostrarAdicionar}
						>
							Voltar
						</Button> 
					</Col>
					<Col>
						<Button 
							type='button' 
							style={{width: '100%'}} 
							onClick={this.ajudadorDeSubmissao}
						>
							Adicionar
						</Button> 
					</Col>
				</Row>
			</div>
		)
	}
}

function mapStateToProps({usuarioLogado}){
	return {
		usuarioLogado,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarCategoriaNaApi: (elemento, token) => dispatch(salvarCategoriaNaApi(elemento, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaSalvar)
