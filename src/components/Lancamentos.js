import React from 'react'
import { connect } from 'react-redux'
import Lancamento from './Lancamento'
import Responsive from 'react-responsive';
import {
	Label,
	FormGroup,
	Input,
	Row,
	Col,
	Table
} from 'reactstrap'
import { EMPRESA_ADMINISTRACAO_ID } from '../helpers/constantes'


class Lancamentos extends React.Component {

	state = {
		categoria_id: 0,
		empresa_id: 0,
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name
		this.setState({[name]: valor})
	}

	render() {
		const Desktop = props => <Responsive {...props} minWidth={992} />;
		const { 
			lancamentos, 
			categorias,
			empresas,
			empresa_usuario_logado_id,
		} = this.props
		const {
			categoria_id,
			empresa_id,
		} = this.state

		let lancamentosFiltrados = lancamentos
		if(categoria_id && parseInt(categoria_id) !== 0){
			lancamentosFiltrados = lancamentosFiltrados
				.filter(lancamento => lancamento.categoria_id === categoria_id)
		}
		if(empresa_id && parseInt(empresa_id) !== 0){
			lancamentosFiltrados = lancamentosFiltrados
				.filter(lancamento => lancamento.empresa_id === empresa_id)
		}
		return (
			<div style={{marginTop: 65}}>
				<h5>Filtro</h5>
				<Row>
				<Col>
				<FormGroup>
					<Label for="categoria_id">Categoria</Label>
					<Input 
						type="select" 
						name="categoria_id" 
						id="categoria_id" 
						value={categoria_id} 
						onChange={this.ajudadorDeCampo}
					>
						<option value='0'>Todas</option>
						{
							categorias &&
								categorias.map(categoria => {
									return (
										<option 
											key={categoria._id}
											value={categoria._id}
										>
											{categoria.nome}
										</option>
									)
								})
						}
					</Input>
				</FormGroup>
				</Col>
				<Col>
				{
					empresa_usuario_logado_id === EMPRESA_ADMINISTRACAO_ID && 
						<FormGroup>
							<Label for="empresa_id">Empresa</Label>
							<Input 
								type="select" 
								name="empresa_id" 
								id="empresa_id" 
								value={empresa_id} 
								onChange={this.ajudadorDeCampo}
							>
								<option value='0'>Todas</option>
								{
									empresas &&
										empresas.map(empresa => {
											return (
												<option 
													key={empresa._id}
													value={empresa._id}
												>
													{empresa.nome}
												</option>
											)
										})
								}
							</Input>
						</FormGroup>
				}
				</Col>

				</Row>
				<Table style={{textAlign: 'center'}}>
					<thead style={{background: '#7CC9BC', color: '#fff'}}>
						<tr>
							<Desktop><td>Data</td></Desktop>
							<td>Valor</td>
							<Desktop><td>Taxa</td></Desktop>
							<td>Categoria</td>
							<td>Tipo</td>
							{/* <Desktop><td>Quem Lançou</td></Desktop> */}
							<Desktop><td>Situação</td></Desktop>
							<Desktop><td>Empresa</td></Desktop>
							{/* <Desktop><td>Descrição</td></Desktop> */}
							<td>#</td>
						</tr>
					</thead>

				{
					lancamentosFiltrados &&
						lancamentosFiltrados.map(lancamento => 
							<Lancamento 
								key={lancamento._id}
								lancamento_id={lancamento._id} 
							/>
						)
					}
				</Table>
			</div>

		)
	}
}

const mapStateToProps = (state, { empresa_id })  => {
	const usuarioLogado = state.usuarios
		.find(usuario => usuario._id === state.usuarioLogado.usuario_id)

	let lancamentos = state.lancamentos
	/* Tela de extrato da empresa */
	if(usuarioLogado.empresa_id !== EMPRESA_ADMINISTRACAO_ID){
		lancamentos = state.lancamentos.filter(lancamento => lancamento.empresa_id === usuarioLogado.empresa_id)
	}
	return {
		lancamentos,
		categorias: state.categorias,
		empresas: state.empresas,
		empresa_usuario_logado_id: usuarioLogado.empresa_id,
	}
}

export default connect(mapStateToProps, null)(Lancamentos)
