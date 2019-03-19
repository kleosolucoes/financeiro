import React from 'react'
import { connect } from 'react-redux'
import Lancamento from './Lancamento'
import LancarUm from './LancarUm'
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
		mes: (new Date().getMonth() + 1),
		ano: new Date().getFullYear(),
		mostrarAlterarLancamento: false,
		lancamento_id: null,
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name
		this.setState({[name]: valor})
	}

	componentDidMount(){
		this.setState({categoria_id: this.props.categoria_id})
	}

	alternarMostrarAlterarLancamento = (lancamento_id) => this.setState({
		mostrarAlterarLancamento: !this.state.mostrarAlterarLancamento,
		lancamento_id,
	})

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
			mes,
			ano,
			mostrarAlterarLancamento,
			lancamento_id,
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
		if(mes && parseInt(mes) !== 0){
			lancamentosFiltrados = lancamentosFiltrados
				.filter(lancamento => parseInt(lancamento.data.split('/')[1]) === parseInt(mes))
		}
		if(ano && parseInt(ano) !== 0){
			lancamentosFiltrados = lancamentosFiltrados
				.filter(lancamento => parseInt(lancamento.data.split('/')[2]) === parseInt(ano))
		}
		let arrayMes = []
		for(let indiceMes = 1; indiceMes <= 12; indiceMes++){
			arrayMes.push(<option key={indiceMes} value={indiceMes}>{indiceMes}</option>)
		}
		let arrayAnos = []
		const anoAtual = new Date().getFullYear()
		for(let indiceAno = 2019; indiceAno <= anoAtual; indiceAno++){
			arrayAnos.push(<option key={indiceAno} value={indiceAno}>{indiceAno}</option>)
		}

		return (
			<div style={{marginTop: 65}}>
				{
					mostrarAlterarLancamento &&
						<LancarUm 
							lancamento_id={lancamento_id}
							alternarMostrarAlterarLancamento={this.alternarMostrarAlterarLancamento}
						/>
				}
				{
					!mostrarAlterarLancamento &&
						<div>
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
								{
									empresa_usuario_logado_id === EMPRESA_ADMINISTRACAO_ID && 
										<Col>
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
										</Col>
								}
							</Row>
							<Row>
								<Col style={{padding: 0}}>
									<FormGroup>
										<Label for="mes">Mês:</Label>
										<Input 
											type="select" 
											name="mes" 
											id="mes" 
											value={mes} 
											onChange={this.ajudadorDeCampo}
										>
											<option value='0'>Todos</option>
											{
												arrayMes.map(mes => mes)
											}
										</Input>
									</FormGroup>
								</Col>
								<Col style={{paddingLeft: 5}}>
									<FormGroup>
										<Label for="ano">Ano:</Label>
										<Input 
											type="select" 
											name="ano" 
											id="ano" 
											value={ano} 
											onChange={this.ajudadorDeCampo}
										>
											<option value='0'>Todos</option>
											{
												arrayAnos.map(ano => ano)
											}
										</Input>
									</FormGroup>
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
												alternarMostrarAlterarLancamento={this.alternarMostrarAlterarLancamento}
											/>
										)
								}
							</Table>
						</div>
				}
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
		lancamentos: lancamentos && lancamentos.filter(lancamento => lancamento.data_inativacao === null),
		categorias: state.categorias,
		empresas: state.empresas,
		empresa_usuario_logado_id: usuarioLogado.empresa_id,
	}
}

export default connect(mapStateToProps, null)(Lancamentos)
