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
						{
							tipo === 	STRING_LANCAMENTOS &&
							<CardDeck>
					      <Card body outline color="secondary">
					        <CardBody>
					          <CardTitle className="text-danger">A Pagar</CardTitle>
					          <CardText className="text-danger"><h1>{aPagar}</h1></CardText>
					        </CardBody>
					      </Card>
					      <Card body outline color="secondary">
					        <CardBody>
					          <CardTitle className="text-success">Saldo Atual</CardTitle>
					          <CardText className="text-success"><h1>{saldoAtual}</h1></CardText>
					        </CardBody>
					      </Card>
					      <Card body outline color="secondary">
					        <CardBody>
					          <CardTitle className="text-success">A Receber</CardTitle>
					          <CardText className="text-success"><h1>{aReceber}</h1></CardText>
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
