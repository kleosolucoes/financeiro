import React from 'react'
import {
	Row,
	FormGroup,
	Label,
	Input,
	Alert,
	Button
} from 'reactstrap'
import { connect } from 'react-redux'
import { salvarEmpresa } from '../actions'
import { pegarDataEHoraAtual } from '../helpers/funcoes'

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

			const novoRegistro = true
			const elemento = {
				id: Date.now(),
				data_criacao: pegarDataEHoraAtual()[0],
				hora_criacao: pegarDataEHoraAtual()[1],
				data_inativacao: null,
				hora_inativacao: null,
			}
			elemento.nome = nome.toUpperCase()
			elemento.empresa_tipo_id = parseInt(empresa_tipo_id)
			elemento.usuario_id = this.props.usuario_id

			this.props.salvarEmpresa(elemento, novoRegistro)
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
											key={empresaTipo.id}
											value={empresaTipo.id}
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
					{
						mostrarMensagemDeErro &&
							<div style={{padding: 10}}>
								<Alert color='warning'>
									Campos inválidos
								</Alert>
							</div>
					}
				<Row style={{padding: 5, justifyContent: 'flex-end'}}>

						<Button 
							type='button' 
							className="botao-lancar"
							// style={{width: '100%'}} 
							onClick={this.props.alternarMostrarSalvarEmpresa}
						>
							Voltar
						</Button> 

						<Button 
							type='button' 
							className="botao-lancar"
							style={{marginLeft: 5}} 
							onClick={this.ajudadorDeSubmissao}
						>
							Adicionar
						</Button> 

				</Row>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		usuario_id: state.usuarioLogado.usuario_id,
		empresaTipo: state.empresaTipo,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarEmpresa: (elemento, novo) => dispatch(salvarEmpresa(elemento, novo)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaSalvar)
