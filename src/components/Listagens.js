import React from 'react'
import ElementoListagem from './ElementoListagem'
import ElementoSalvar from './ElementoSalvar'
import {connect} from 'react-redux'
import {
	ListGroup,
	Button,
	Row,
	Col,
	Alert,
	FormGroup,
	Label,
	Input,
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
} from '../helpers/constantes'

class Listagens extends React.Component {

	componentDidMount(){
		const { tipo, elementos, lancamentoSituacao } = this.props
		let aPagar = 0
		let saldoAtual = 0
		let aReceber =  0
		elementos.map(elemento => {
			let lancamentoSituacaoAtiva = lancamentoSituacao.find(
				lancamentoSituacao => lancamentoSituacao.lancamento_id === elemento.id && lancamentoSituacao.data_inativacao === null)
			if(lancamentoSituacaoAtiva.situacao_id === 2 && elemento.credito_debito === 'D'){
				aPagar += elemento.valor
			}
			if(lancamentoSituacaoAtiva.situacao_id === 2 && elemento.credito_debito === 'C'){
				aReceber += elemento.valor
			}
			if(lancamentoSituacaoAtiva.situacao_id === 1 && elemento.credito_debito === 'C'){
				saldoAtual += elemento.valor
			}
			if(lancamentoSituacaoAtiva.situacao_id === 1 && elemento.credito_debito === 'D'){
				saldoAtual -= elemento.valor
			}
			return false
		})
		this.setState({
			tela: tipo,
			aPagar,
			saldoAtual,
			aReceber,
		})
	}

	state = {
		mostrarSalvar: false,
		elemento: null,
		tela: null,
		aPagar: 0,
		saldoAtual: 0,
		aReceber: 0,
		mes: (new Date().getMonth() + 1),
		ano: new Date().getFullYear(),
	}

	mostrarSalvar = (elemento) => this.setState({mostrarSalvar: true, elemento})
	esconderSalvar = () => this.setState({mostrarSalvar: false, elemento: null})
	atualizarCampoMes = (valor) => this.setState({mes: valor})
	atualizarCampoAno = (valor) => this.setState({ano: valor})

	render() {
		const { elementos, tipo } = this.props
		const { mostrarSalvar, elemento, aPagar, saldoAtual, aReceber, mes, ano } = this.state

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
						{
							tipo === 	STRING_LANCAMENTOS &&
							<div>
								<Row>
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
							</div>
						}
							<ListGroup flush>
								{
									elementos &&
										elementos.map((elemento, indice) =>
											<ElementoListagem
												key={indice}
												elemento_id={elemento.id}
												tipo={tipo}
												mostrarSalvar={this.mostrarSalvar}
											/>
										)
								}
							</ListGroup>
							<Button	onClick={() => {this.mostrarSalvar(null)}}>
								Cadastrar
							</Button>
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
	}
}

export default connect(mapStateToProps, null)(Listagens)
