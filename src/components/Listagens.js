import React from 'react'
import ElementoListagem from './ElementoListagem'
import ElementoSalvar from './ElementoSalvar'
import {connect} from 'react-redux'
import {
	Button,
	Row,
	Col,
	Alert,
	FormGroup,
	Label,
	Input,
	ListGroup,
} from 'reactstrap'
import {
	STRING_LANCAMENTOS,
	STRING_CATEGORIAS,
	STRING_EMPRESAS,
	STRING_FORNECEDORES,
	STRING_CLIENTES,
	STRING_USUARIOS,
	ENTIDADE_TIPO_EMPRESA,
	ENTIDADE_TIPO_FORNECEDOR,
	ENTIDADE_TIPO_CLIENTE,
	STRING_PAGO,
	STRING_NAO_PAGO,
} from '../helpers/constantes'
import { getMoney, formatReal } from '../helpers/funcoes'

class Listagens extends React.Component {

	constructor(props){
		super(props)

		let grandesNumeros = {}
		if(props.tipo === STRING_LANCAMENTOS){
			grandesNumeros = {...this.atualizarOsGrandeNumeros(),}
		}

		this.state = {
			mostrarSalvar: false,
			elemento: null,
			mes: (new Date().getMonth() + 1),
			ano: new Date().getFullYear(),
			...grandesNumeros,
		}
	}

	componentDidUpdate(prevProps){
		if(this.props.elementos.length !== prevProps.elementos.length){

			let grandesNumeros = {}
			if(this.props.tipo === STRING_LANCAMENTOS){
				grandesNumeros = {...this.atualizarOsGrandeNumeros(),}
			}
			this.setState({
				...grandesNumeros,
				elementos: this.props.elementos,
			})
		}
	}

	atualizarOsGrandeNumeros(){
		const { elementos, lancamentoSituacao, categorias } = this.props
		let aPagar = 0
		let saldoAtual = 0
		let aReceber =  0
		elementos.map(elemento => {
			let lancamentoSituacaoAtiva = lancamentoSituacao.find(
				lancamentoSituacao => lancamentoSituacao.lancamento_id === elemento.id && lancamentoSituacao.data_inativacao === null)
			let categoria = categorias.find(categoria => categoria.id === elemento.categoria_id)
			const valor = getMoney(elemento.valor)
			if(lancamentoSituacaoAtiva.situacao_id === STRING_NAO_PAGO && categoria.credito_debito === 'D'){
				aPagar += valor
			}
			if(lancamentoSituacaoAtiva.situacao_id === STRING_NAO_PAGO && categoria.credito_debito === 'C'){
				aReceber += valor
			}
			if(lancamentoSituacaoAtiva.situacao_id === STRING_PAGO && categoria.credito_debito === 'C'){
				saldoAtual += valor
			}
			if(lancamentoSituacaoAtiva.situacao_id === STRING_PAGO && categoria.credito_debito === 'D'){
				saldoAtual -= valor
			}
			return false
		})
		return {
			aPagar: formatReal(aPagar),
			saldoAtual: formatReal(saldoAtual),
			aReceber: formatReal(aReceber),
		}
	}

	mostrarSalvar = (elemento) => this.setState({mostrarSalvar: true, elemento})
	esconderSalvar = () => this.setState({mostrarSalvar: false, elemento: null})
	atualizarCampoMes = (valor) => this.setState({mes: valor})
	atualizarCampoAno = (valor) => this.setState({ano: valor})

	render() {
		const { mostrarSalvar, elemento, aPagar, saldoAtual, aReceber, mes, ano } = this.state
		const { tipo, elementos, } = this.props

		let elementosFiltrados = null
		if(tipo === STRING_LANCAMENTOS){
			elementosFiltrados = elementos.filter(
				elemento => {
					let dataSplit = elemento.data.split('/')
					let mesInteiro = parseInt(dataSplit[1])
					let anoInteiro = parseInt(dataSplit[2])
					let mesDoFiltroInteiro = parseInt(mes)
					let anoDoFiltroInteiro = parseInt(ano)
					return mesDoFiltroInteiro === mesInteiro && anoDoFiltroInteiro=== anoInteiro
				})
		}else{
			elementosFiltrados = elementos
		}

		if(this.state.tela !== tipo){
			this.setState({
				tela: tipo,
				mostrarSalvar: false,
			})
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
			<div>
				{
					mostrarSalvar &&
						<ElementoSalvar
							esconderSalvar={this.esconderSalvar}
							elemento={elemento}
							tipo={tipo}
						/>
				}
				{
					!mostrarSalvar &&
						<div>
							<Row style={{padding:10}}>
								<Col style={{textAlign: 'right'}}>
									<Button onClick={() => {this.mostrarSalvar(null)}}>
										Cadastrar
									</Button>
								</Col>
							</Row>

							{
								tipo === STRING_LANCAMENTOS &&
									<div>
											<Row style={{textAlign: 'center'}}>
												<Col sm="4">
													<Alert color="dark">Saldo Atual: {saldoAtual}</Alert>
												</Col>
												<Col sm="4">
													<Alert color="danger">A Pagar: {aPagar}</Alert>
												</Col>
												<Col sm="4">
													<Alert color="success">A Receber: {aReceber}</Alert>
												</Col>
											</Row>
											<Row>
												<Col>
													<FormGroup>
														<Label for="mes">* Mês:</Label>
														<Input
															type="select"
															name="mes"
															id="mes"
															value={mes}
															onChange={(event) => {this.atualizarCampoMes(event.target.value)}}
														>
															<option value='0'>Selecione</option>
															{
																arrayMes.map(mes => mes)
															}
														</Input>
													</FormGroup>
												</Col>
													<Col>
													<FormGroup>
														<Label for="ano">* Ano:</Label>
														<Input
															type="select"
															name="ano"
															id="ano"
															value={ano}
															onChange={(event) => {this.atualizarCampoAno(event.target.value)}}
														>
															<option value='0'>Selecione</option>
															{
																arrayAnos.map(ano => ano)
															}
														</Input>
													</FormGroup>
												</Col>
											</Row>
									</div>
							}
							{
								elementosFiltrados &&
									<ListGroup flush>
									{
										elementosFiltrados.map((elemento) =>
											<ElementoListagem
												key={elemento.id}
												elemento_id={elemento.id}
												tipo={tipo}
												mostrarSalvar={this.mostrarSalvar}
											/>
										)
									}
									</ListGroup>
							}
						</div>
				}
			</div>
		)
	}
}

const mapStateToProps = (state, { tipo }) => {
	let elementos = null
	if(tipo === STRING_LANCAMENTOS){
		elementos = state.lancamentos && state.lancamentos.filter(elemento => elemento.data_inativacao === null)
	}
	if(tipo === STRING_CATEGORIAS){
		elementos = state.categorias && state.categorias.filter(elemento => elemento.data_inativacao === null)
	}
	if(tipo === STRING_EMPRESAS){
		elementos = state.entidades && state.entidades.filter(entidade => entidade.entidade_tipo_id === ENTIDADE_TIPO_EMPRESA && entidade.data_inativacao === null)
	}
	if(tipo === STRING_FORNECEDORES){
		elementos = state.entidades && state.entidades.filter(entidade => entidade.entidade_tipo_id === ENTIDADE_TIPO_FORNECEDOR && entidade.data_inativacao === null)
	}
	if(tipo === STRING_CLIENTES){
		elementos = state.entidades && state.entidades.filter(entidade => entidade.entidade_tipo_id === ENTIDADE_TIPO_CLIENTE && entidade.data_inativacao === null)
	}
	if(tipo === STRING_USUARIOS){
		elementos = state.usuarios && state.usuarios.filter(elemento => elemento.data_inativacao === null)
	}
	return {
		elementos,
		lancamentoSituacao: state.lancamentoSituacao,
		categorias: state.categorias
	}
}

export default connect(mapStateToProps, null)(Listagens)
