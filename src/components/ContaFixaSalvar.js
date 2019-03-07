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
import { salvarContaFixa } from '../actions'
import { pegarDataEHoraAtual } from '../helpers/funcoes'

class ContaFixaSalvar extends React.Component {

	state = {
		categoria_id: 0,
		dia_gerar: 0,
		dia_notificacao: 0,
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
			categoria_id,
			dia_gerar,
			dia_notificacao,
		} = this.state
		let {
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		camposComErro = []

		mostrarMensagemDeErro = false
		if(parseInt(categoria_id) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('categoria_id')
		}
		if(parseInt(dia_gerar) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('dia_gerar')
		}
		if(parseInt(dia_notificacao) === 0){
			mostrarMensagemDeErro = true
			camposComErro.push('dia_notificacao')
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
			elemento.categoria_id = parseInt(categoria_id)
			elemento.dia_gerar = parseInt(dia_gerar)
			elemento.dia_notificacao = parseInt(dia_notificacao)
			elemento.usuario_id = this.props.usuario_id
			this.props.salvarContaFixa(elemento, novoRegistro)
			this.props.alternarMostrarSalvarContaFixa()
		}
	}

	render() {
		const {
			categoria_id,
			dia_gerar,
			dia_notificacao,
			mostrarMensagemDeErro,
			camposComErro,
		} = this.state
		const {
			categorias,
		} = this.props

		let arrayDias = []
		for(let indiceDia = 1; indiceDia <= 31; indiceDia++){
			arrayDias.push(<option key={indiceDia} value={indiceDia}>{indiceDia}</option>)
		}

		return (
			<div>
				<h1>Adicionar Conta Fixa</h1>
				<FormGroup>
					<Label for="categoria_id">Categoria</Label>
					<Input 
						type="select" 
						name="categoria_id" 
						id="categoria_id" 
						value={categoria_id} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('categoria_id') ? true : null}
					>
						<option value='0'>Selecione</option>
						{
							categorias &&
								categorias.map(categoria => {
									return (
										<option 
											key={categoria.id}
											value={categoria.id}
										>
											{categoria.nome}
										</option>
									)
								})
						}
					</Input>
					{camposComErro.includes('categoria_id') && <Alert color='danger'>Selecione a Categoria</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="dia_gerar">Dia para Gerar</Label>
					<Input 
						type="select" 
						name="dia_gerar" 
						id="dia_gerar" 
						value={dia_gerar} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('dia_gerar') ? true : null}
					>
						<option value='0'>Selecione</option>
						{
							arrayDias.map(dia => dia)
						}
					</Input>
					{camposComErro.includes('dia_gerar') && <Alert color='danger'>Selecione o dia para gerar a conta</Alert>}
				</FormGroup>
				<FormGroup>
					<Label for="dia_notificacao">Dia para ser Notificado</Label>
					<Input 
						type="select" 
						name="dia_notificacao" 
						id="dia_notificacao" 
						value={dia_notificacao} 
						onChange={this.ajudadorDeCampo}
						invalid={camposComErro.includes('dia_notificacao') ? true : null}
					>
						<option value='0'>Selecione</option>
						{
							arrayDias.map(dia => dia)
						}
					</Input>
					{camposComErro.includes('dia_notificacao') && <Alert color='danger'>Selecione o dia para ser notificado</Alert>}
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
							onClick={this.props.alternarMostrarSalvarContaFixa}
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
		categorias: state.categorias,
		usuario_id: state.usuarioLogado.usuario_id,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarContaFixa: (elemento, novo) => dispatch(salvarContaFixa(elemento, novo)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContaFixaSalvar)
