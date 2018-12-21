import React from 'react'
import { 
	Button,
	Form,
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
import {
	salvarLancamento,
	salvarEntidade,
	salvarCategoria,
	salvarUsuario,
} from '../actions'
import {connect} from 'react-redux'

class ElementoSalvar extends React.Component {

	state = {
		nome: '',
	}

	componentDidMount(){
		const { elemento } = this.props
		if(elemento){
			let objetoEstado = {}
			if(elemento.nome){
				objetoEstado.nome = elemento.nome
			}
			this.setState(objetoEstado)
		}
	}

	atualizarCampoNome = (valor) => this.setState({nome: valor})

	ajudadorDeSubmit(){
		const { 
			tipo, 
			esconderSalvar,
			salvarLancamento,
			salvarCategoria,
			salvarEntidade,
			salvarUsuario,
		} = this.props
		let { elemento } = this.props

		if(elemento){
			if(elemento.nome){
				elemento.nome = this.state.nome
			}
		}else{
			let dataAtual = new Date()
			let dia = dataAtual.getDate() + ''
			dia = dia.padStart(2, '0')
			elemento = {
				id: null ,
				data_criacao: dia + '/' + (dataAtual.getMonth()+1) + '/' + dataAtual.getFullYear(),
				data_inativacao: null,
			}
			if(this.state.nome){
				elemento.nome = this.state.nome
			}

			if(tipo === STRING_EMPRESAS){
				elemento.entidade_tipo_id = ENTIDADE_TIPO_EMPRESA
			}
			if(tipo === STRING_FORNECEDORES){
				elemento.entidade_tipo_id = ENTIDADE_TIPO_FORNECEDOR
			}
			if(tipo === STRING_CLIENTES){
				elemento.entidade_tipo_id = ENTIDADE_TIPO_CLIENTE
			}
		}

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
			esconderSalvar()
		}else{
			alert('error')
		}
	}

	render() {
		const { tipo, esconderSalvar } = this.props
		const { nome } = this.state

		return (
			<Form>
				{
					(tipo === STRING_CATEGORIAS 
						|| tipo === STRING_EMPRESAS 
						|| tipo === STRING_FORNECEDORES
						|| tipo === STRING_CLIENTES
						|| tipo === STRING_USUARIOS) && 
						<FormGroup>
							<Label for="nome">Nome</Label>
							<Input 
								type="text" 
								name="nome" 
								id="nome" 
								placeholder="Nome Completo" 
								value={nome}
								onChange={(event) => {this.atualizarCampoNome(event.target.value)}}
							/>
						</FormGroup>
				}
				<Button onClick={() => {this.ajudadorDeSubmit()}} >Submit</Button>
			<Button onClick={() => {esconderSalvar()}} >Voltar</Button>
		</Form>			
		)
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
export default connect(null, mapDispatchToProps)(ElementoSalvar)
