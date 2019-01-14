import React from 'react'
import { 
	ListGroupItem, 
	Row, 
	Col,
	Button,
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
} from '../helpers/constantes'

class ElementoListagem extends React.Component {

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

	render() {
		const { elemento, mostrarSalvar } = this.props
		return (
			<ListGroupItem>
				<Row>
					<Col>
						{elemento.id}
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
					</ListGroupItem>
		)
	}
}

const mapStateToProps = (state, { tipo, elemento_id }) => {
	let elemento = null
	if(tipo === STRING_LANCAMENTOS){
		elemento = state.lancamentos && state.lancamentos.find(elemento => elemento.id === elemento_id)
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
