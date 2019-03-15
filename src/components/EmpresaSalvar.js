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
import { salvarEmpresaNaApi } from '../actions'

class EmpresaSalvar extends React.Component {

	state = {
		empresa_tipo_id: 0,
		nome: '',
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
			empresa_tipo_id,
			nome,
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
		if(parseInt(empresa_tipo_id) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('empresa_tipo_id')
		}
		if(nome === ''){
			mostrarMensagemDeErro = true
			camposComErro.push('nome')
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
			elemento.nome = nome.toUpperCase()
			elemento.empresa_tipo_id = empresa_tipo_id
			elemento.usuario_id = usuarioLogado.usuario_id

			this.props.salvarEmpresaNaApi(elemento, usuarioLogado.token)
			this.props.alternarMostrarSalvarEmpresa()
			alert('Empresa Salva com sucesso!')
		}
	}

	render() {
		const {
			empresa_tipo_id,
			nome,
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		const {
			empresaTipo,
		} = this.props

		return (
			<div>
				<h1>Adicionar Empresa</h1>
				<FormGroup>
					<Label for="empresa_tipo_id">Tipo</Label>
					<Input 
						type="select" 
						name="empresa_tipo_id" 
						id="empresa_tipo_id" 
						value={empresa_tipo_id} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('empresa_tipo_id') ? true : null}
					>
						<option value='0'>Selecione</option>
						{
							empresaTipo && 
								empresaTipo.map(empresaTipo => {
									return (
										<option 
											key={empresaTipo._id}
											value={empresaTipo._id}
										>
											{empresaTipo.nome}
										</option>
									)
								})
						}
					</Input>
					{camposComErro.includes('empresa_tipo_id') && <Alert color='danger'>Selecione um Tipo</Alert>}
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
						<button 
							type='button' 
							style={{width: '100%'}} 
							onClick={this.props.alternarMostrarSalvarEmpresa}
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
	return {
		usuarioLogado: state.usuarioLogado,
		empresaTipo: state.empresaTipo,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarEmpresaNaApi: (elemento, token) => dispatch(salvarEmpresaNaApi(elemento, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaSalvar)
