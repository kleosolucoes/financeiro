import React from 'react'
import {
	Row,
	Col,
	Button,
	Card,
	CardTitle,
	CardText,
	Badge,
} from 'reactstrap'
import {
	salvarLancamento,
	salvarEntidade,
	salvarCategoria,
	salvarUsuario,
} from '../actions'
import {connect} from 'react-redux'
import {
	STRING_LANCAMENTOS,
	STRING_CATEGORIAS,
	STRING_EMPRESAS,
	STRING_FORNECEDORES,
	STRING_CLIENTES,
	STRING_USUARIOS,
	STRING_PAGO,
} from '../helpers/constantes'

class ElementoListagem extends React.Component {

	state = {
		corDoBox: 'secondary',
		corDasLetras: 'text-muted',
		elementoCreditoDebito: '',
	}

	componentDidMount(){
		if(this.props.tipo === STRING_LANCAMENTOS){
			const {situacao, categoria } = this.props
			if(situacao.id === STRING_PAGO && categoria.credito_debito === 'C'){
				this.setState({corDoBox: 'success'})
				this.setState({corDasLetras: 'text-success'})
			}
			if(situacao.id === STRING_PAGO && categoria.credito_debito === 'D'){
				this.setState({corDoBox: 'danger'})
				this.setState({corDasLetras: 'text-danger'})
			}
			if(categoria.credito_debito === 'C'){
				this.setState({elementoCreditoDebito: 'Recebimentos'})
			}
			if(categoria.credito_debito === 'D'){
				this.setState({elementoCreditoDebito: 'Despesas'})
			}
		}
	}

	render() {
		const {tipo, elemento, categoria, situacao, mostrarSalvar } = this.props
		const {corDasLetras, corDoBox, elementoCreditoDebito} = this.state
		return (
			<div style={{marginBottom:15, marginTop:15}}>
				{
					tipo === STRING_LANCAMENTOS &&
						<div>
							<Card body outline color={corDoBox}>
								<CardTitle className={corDasLetras}>
									{categoria.nome} -
									R$ {elemento.valor}
								</CardTitle>
								<CardText className={corDasLetras}>
									{elemento.data} - {elementoCreditoDebito}
								</CardText>
								<Badge color={corDoBox}>{situacao.nome}</Badge>
							</Card>
						</div>
				}
				{
					tipo !== STRING_LANCAMENTOS &&
						<Row>
							<Col>
								{elemento.id}
							</Col>
							<Col>
								{elemento.data_criacao}
							</Col>
							<Col>
								{elemento.data_criacao}
							</Col>
							{
								elemento.nome &&
									<Col>
										{elemento.nome}
									</Col>
							}
							<Col>
								<Button
									onClick={() => {mostrarSalvar(elemento)}}>
									Alterar
								</Button>
							</Col>
							<Col>
								<Button
									onClick={() => {this.ajudadorDeRemocao()}}
									color="danger">
									Remover
								</Button>
							</Col>
						</Row>
				}
			</div>
		)
	}

	ajudadorDeRemocao(){
		const resposta = window.confirm('Realmente deseja remover?');
		if(resposta){
			const {
				tipo,
				salvarLancamento,
				salvarCategoria,
				salvarEntidade,
				salvarUsuario,
			} = this.props
			let { elemento } = this.props

			let dataAtual = new Date()
			let dia = dataAtual.getDate() + ''
			dia = dia.padStart(2, '0')
			elemento.data_inativacao =  dia + '/' + (dataAtual.getMonth()+1) + '/' + dataAtual.getFullYear()

			let funcaoSalvar = null
			if(tipo === STRING_CATEGORIAS){
				funcaoSalvar = salvarCategoria
			}
			if(tipo === STRING_EMPRESAS || tipo === STRING_FORNECEDORES || tipo === STRING_CLIENTES){
				funcaoSalvar = salvarEntidade
			}
			if(tipo === STRING_USUARIOS){
				funcaoSalvar = salvarUsuario
			}
			if(tipo === STRING_LANCAMENTOS){
				funcaoSalvar = salvarLancamento
			}
			if(funcaoSalvar){
				funcaoSalvar(elemento)
			}else{
				alert('error')
			}
		}
	}

}

const mapStateToProps = (state, { tipo, elemento_id }) => {
	let elemento = null
	let lancamentoSituacao = null
	let categoria = null
	let situacao = null
	if(tipo === STRING_LANCAMENTOS){
		elemento = state.lancamentos && state.lancamentos.find(elemento => elemento.id === elemento_id)
		lancamentoSituacao = state.lancamentoSituacao &&
			state.lancamentoSituacao.find(lancamentoSituacao => lancamentoSituacao.data_inativacao === null && lancamentoSituacao.lancamento_id === elemento.id)
		categoria = state.categorias && state.categorias.find(categoria => categoria.id === elemento.categoria_id)
		situacao = state.situacoes && state.situacoes.find(situacao => situacao.id === lancamentoSituacao.situacao_id)
	}
	if(tipo === STRING_CATEGORIAS){
		elemento = state.categorias && state.categorias.find(elemento => elemento.id === elemento_id)
	}
	if(tipo === STRING_EMPRESAS || tipo === STRING_FORNECEDORES || tipo === STRING_CLIENTES){
		elemento = state.entidades && state.entidades.find(elemento => elemento.id === elemento_id)
	}
	if(tipo === STRING_USUARIOS){
		elemento = state.usuarios && state.usuarios.find(elemento => elemento.id === elemento_id)
	}
	return {
		elemento,
		categoria,
		situacao,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarLancamento: (elemento) => dispatch(salvarLancamento(elemento)),
		salvarCategoria: (elemento) => dispatch(salvarCategoria(elemento)),
		salvarEntidade: (elemento) => dispatch(salvarEntidade(elemento)),
		salvarUsuario: (elemento) => dispatch(salvarUsuario(elemento)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementoListagem)
