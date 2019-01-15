import React from 'react'
import ElementoListagem from './ElementoListagem'
import ElementoSalvar from './ElementoSalvar'
import {connect} from 'react-redux'
import {
	ListGroup,
	Button,
	Card,
	CardTitle,
	CardText,
	CardDeck,
	CardBody,
	Row,
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

		this.state = {
			tela: props.tipo,
			...this.atualizarOsGrandeNumeros()
		}
	}

	componentDidUpdate(prevProps){
		if(this.props.elementos.length !== prevProps.elementos.length){
			this.setState({...this.atualizarOsGrandeNumeros()})
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

	state = {
		mostrarSalvar: false,
		elemento: null,
		tela: null,
		aPagar: 0,
		saldoAtual: 0,
		aReceber: 0,
	}

	mostrarSalvar = (elemento) => this.setState({mostrarSalvar: true, elemento})
	esconderSalvar = () => this.setState({mostrarSalvar: false, elemento: null})

	render() {
		const { elementos, tipo } = this.props
		const { mostrarSalvar, elemento, aPagar, saldoAtual, aReceber } = this.state

		if(this.state.tela !== tipo){
			this.setState({
				tela: tipo,
				mostrarSalvar: false,
			})
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
							<Row style={{padding: 10}}>
								<Button onClick={() => {this.mostrarSalvar(null)}}>
									Cadastrar
								</Button>
							</Row>
							{
								tipo === STRING_LANCAMENTOS &&
									<CardDeck>
										<Card body outline color="secondary">
											<CardBody>
												<CardTitle className="text-danger">A Pagar</CardTitle>
												<CardText className="text-danger">{aPagar}</CardText>
											</CardBody>
										</Card>
										<Card body outline color="secondary">
											<CardBody>
												<CardTitle className="text-success">Saldo Atual</CardTitle>
												<CardText className="text-success">{saldoAtual}</CardText>
											</CardBody>
										</Card>
										<Card body outline color="secondary">
											<CardBody>
												<CardTitle className="text-success">A Receber</CardTitle>
												<CardText className="text-success">{aReceber}</CardText>
											</CardBody>
										</Card>
									</CardDeck>
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
