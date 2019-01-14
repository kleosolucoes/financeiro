import React from 'react'
import { 
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Alert,
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
		categoria_id: 0,
		valor: 0,
		pago: 0,
		dia: 0,
		mes: 0,
		ano: 0,
		descricao: '',
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

	render() {
		const { tipo, esconderSalvar, categorias } = this.props
		const { nome } = this.state

		return (
			<div>
				<Alert>Cadastro</Alert>
				<Form>
					{
						tipo === STRING_LANCAMENTOS &&
							<div>
								<FormGroup>
									<Label for="categoria">Categoria:</Label>
									<Input 
										type="select" 
										name="categoria_id" 
										id="categoria_id" 
									>
										<option value='0'>Selecione</option>
										{
											categorias && 
											categorias.map(
												categoria => 
												<option
													key={categoria.id}
													value={categoria.id}
												>
													{categoria.nome}
												</option>
											)
										}
									</Input>
								</FormGroup>
								<FormGroup>
									<Label for="valor">Valor:</Label>
									<Input 
										type="number" 
										name="valor" 
										id="valor" 
									/>
								</FormGroup>
								<FormGroup>
									<Label for="pago">Pago:</Label>
									<Input 
										type="select" 
										name="pago" 
										id="pago" 
									>
										<option value='0'>Selecione</option>
										<option value='1'>Sim</option>
										<option value='2'>Não</option>
									</Input>
								</FormGroup>
								<Label for="data">Data do lançamento:</Label>
								<FormGroup>
									<Label for="dia">Dia:</Label>
									<Input 
										type="select" 
										name="dia" 
										id="dia" 
									>
										<option value='0'>Selecione</option>
									</Input>
								</FormGroup>
								<FormGroup>
									<Label for="mes">Mês:</Label>
									<Input 
										type="select" 
										name="mes" 
										id="mes" 
									>
										<option value='0'>Selecione</option>
									</Input>
								</FormGroup>
								<FormGroup>
									<Label for="ano">Ano:</Label>
									<Input 
										type="select" 
										name="ano" 
										id="ano" 
									>
										<option value='0'>Selecione</option>
									</Input>
								</FormGroup>
								<FormGroup>
									<Label for="ano">Descrição</Label>
									<Input 
										type="textarea" 
										name="descricao" 
										id="descricao" 
									>
									</Input>
								</FormGroup>
							</div>
					}
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
					<Button color='success' style={{float: 'right', marginLeft: 10}} onClick={() => {this.ajudadorDeSubmit()}} >Submit</Button>
				<Button style={{float: 'right', marginLeft: 10}} onClick={() => {esconderSalvar()}} >Voltar</Button>
			</Form>			
		</div>
		)
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
			let mes = dataAtual.getMonth()+1 + ''
			dia = dia.padStart(2, '0')
			mes = mes.padStart(2, '0')
			elemento = {
				id: null ,
				data_criacao: dia + '/' + mes + '/' + dataAtual.getFullYear(),
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
}

function mapStateToProps({categorias}){
	return {
		categorias,
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
export default connect(mapStateToProps, mapDispatchToProps)(ElementoSalvar)
