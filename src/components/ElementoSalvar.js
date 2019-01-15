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
	salvarLancamentoSituacao,
	salvarEntidade,
	salvarCategoria,
	salvarUsuario,
} from '../actions'
import {connect} from 'react-redux'
import { formatReal, getMoney } from '../helpers/funcoes'

class ElementoSalvar extends React.Component {

	state = {
		nome: '',
		categoria_id: 0,
		valor: '0,00',
		situacao_id: 0,
		dia: new Date().getDate(),
		mes: (new Date().getMonth() + 1),
		ano: new Date().getFullYear(),
		descricao: '',
		mostrarMensagemDeError: false,
		categoriaValidade: null,
		valorValidade: null,
		situacaoValidade: null, 
		diaValidade: null,
		mesValidade: null,
		anoValidade: null,
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
		const { tipo, esconderSalvar, categorias, situacoes } = this.props
		const { nome, categoria_id, valor, situacao_id, dia, mes, ano, descricao, mostrarMensagemDeError,
		categoriaValidade, valorValidade, situacaoValidade, diaValidade, mesValidade, anoValidade, } = this.state

		let arrayDias = []
		for(let indiceDia = 1; indiceDia <= 31; indiceDia++){
			arrayDias.push(<option key={indiceDia} value={indiceDia}>{indiceDia}</option>)
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
				<Alert>Cadastro</Alert>
				<Form>
					{
						tipo === STRING_LANCAMENTOS &&
							<div>
								<FormGroup>
									<Label for="categoria_id">* Categoria:</Label>
									<Input 
										type="select" 
										name="categoria_id" 
										id="categoria_id" 
										value={categoria_id}
										onChange={(event) => {this.atualizarCampoCategoria(event.target.value)}}
										invalid={categoriaValidade}
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
									<Label for="valor">* Valor:</Label>
									<Input 
										type="text" 
										name="valor" 
										id="valor" 
										value={valor} 
										bsSize='lg'
										onChange={(event) => {this.atualizarCampoValor(event.target.value)}}
										invalid={valorValidade}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="situacao_id">* Pago:</Label>
									<Input 
										type="select" 
										name="situacao_id" 
										id="situacao_id" 
										value={situacao_id} 
										onChange={(event) => {this.atualizarCampoSituacao(event.target.value)}}
										invalid={situacaoValidade}
									>
										<option value='0'>Selecione</option>
										{
											situacoes && 
											situacoes.map(
												situacao => 
												<option
													key={situacao.id}
													value={situacao.id}
												>
													{situacao.nome}
												</option>
											)
										}
									</Input>
								</FormGroup>
								<Label for="data">Data do lançamento:</Label>
								<FormGroup>
									<Label for="dia">* Dia:</Label>
									<Input 
										type="select" 
										name="dia" 
										id="dia" 
										value={dia} 
										onChange={(event) => {this.atualizarCampoDia(event.target.value)}}
										invalid={diaValidade}
									>
										<option value='0'>Selecione</option>
										{
											arrayDias.map(dia => dia)
										}
									</Input>
								</FormGroup>
								<FormGroup>
									<Label for="mes">* Mês:</Label>
									<Input 
										type="select" 
										name="mes" 
										id="mes" 
										value={mes} 
										onChange={(event) => {this.atualizarCampoMes(event.target.value)}}
										invalid={mesValidade}
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
										invalid={anoValidade}
									>
										<option value='0'>Selecione</option>
										{
											arrayAnos.map(ano => ano)
										}
									</Input>
								</FormGroup>
								<FormGroup>
									<Label for="descricao">Descrição</Label>
									<Input 
										type="textarea" 
										name="descricao" 
										id="descricao" 
										value={descricao} 
										onChange={(event) => {this.atualizarCampoDescricao(event.target.value)}}
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
					{
						mostrarMensagemDeError && 
						<Alert color='danger'>Preencha todos os dados com asteristicos</Alert>
					}
					<Button color='success' style={{float: 'right', marginLeft: 10}} onClick={() => {this.ajudadorDeSubmit()}} >Submit</Button>
				<Button style={{float: 'right', marginLeft: 10}} onClick={() => {esconderSalvar()}} >Voltar</Button>
			</Form>			
		</div>
		)
	}

	atualizarCampoNome = (valor) => this.setState({nome: valor})
	atualizarCampoCategoria = (valor) => this.setState({categoria_id: valor})
	atualizarCampoValor = (valor) => {
		const valorInteiro = getMoney(valor) + ''
		const valorComZerosAEsquerda = valorInteiro.padStart(3, '0')
		const valorFormatado = formatReal(valorComZerosAEsquerda)
		this.setState({valor: valorFormatado})
	}
	atualizarCampoSituacao = (valor) => this.setState({situacao_id: valor})
	atualizarCampoDia = (valor) => this.setState({dia: valor})
	atualizarCampoMes = (valor) => this.setState({mes: valor})
	atualizarCampoAno = (valor) => this.setState({ano: valor})
	atualizarCampoDescricao = (valor) => this.setState({descricao: valor})

	ajudadorDeSubmit(){
		const { 
			tipo, 
			esconderSalvar,
			salvarLancamento,
			salvarLancamentoSituacao,
			salvarCategoria,
			salvarEntidade,
			salvarUsuario,
		} = this.props
		let { elemento } = this.props
		let elementoAssociativo = {}
		let novoRegistro = false
		let mensagemDeErro = false

		if(tipo === STRING_LANCAMENTOS){
			const {
				categoria_id,
				valor,
				situacao_id,
				dia,
				mes,
				ano,
			} = this.state
			
			if(parseInt(categoria_id) === 0){
				mensagemDeErro = true
				this.setState({categoriaValidade: true})
			}
			if(parseInt(situacao_id) === 0){
				mensagemDeErro = true
				this.setState({situacaoValidade: true})
			}
			if(valor === '0,00'){
				mensagemDeErro = true
				this.setState({valorValidade: true})
			}
			if(parseInt(dia) === 0){
				mensagemDeErro = true
				this.setState({diaValidade: true})
			}
			if(parseInt(mes) === 0){
				mensagemDeErro = true
				this.setState({mesValidade: true})
			}
			if(parseInt(ano) === 0){
				mensagemDeErro = true
				this.setState({anoValidade: true})
			}
		}

		if(!mensagemDeErro){
			if(elemento){
				if(elemento.nome){
					elemento.nome = this.state.nome
				}
			}else{
				/* criando */
				novoRegistro = true
				let dataAtual = new Date()
				let dia = dataAtual.getDate() + ''
				let mes = dataAtual.getMonth()+1 + ''
				dia = dia.padStart(2, '0')
				mes = mes.padStart(2, '0')
				elemento = {
					id: Date.now(),
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
				if(tipo === STRING_LANCAMENTOS){
					elemento.categoria_id = parseInt(this.state.categoria_id)
					elemento.valor = this.state.valor
					elemento.descricao = this.state.descricao
					let diaData = this.state.dia + ''
					diaData = diaData.padStart(2, '0')
					let mesData = this.state.mes + ''
					mesData = mesData.padStart(2, '0')
					elemento.data = diaData + '/' + mesData + '/' + this.state.ano

					elementoAssociativo = {
						id: Date.now(),
						data_criacao: dia + '/' + mes + '/' + dataAtual.getFullYear(),
						data_inativacao: null,
						situacao_id: parseInt(this.state.situacao_id),
						lancamento_id: elemento.id,
					}
					salvarLancamentoSituacao(elementoAssociativo, novoRegistro)
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
				funcaoSalvar(elemento, novoRegistro)
				esconderSalvar()
			}
		}else{
			this.setState({mostrarMensagemDeError: true})
		}
	}
}

function mapStateToProps({ categorias, situacoes }){
	return {
		categorias,
		situacoes,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarLancamento: (elemento, novo) => dispatch(salvarLancamento(elemento, novo)),
		salvarLancamentoSituacao: (elemento, novo) => dispatch(salvarLancamentoSituacao(elemento, novo)),
		salvarCategoria: (elemento, novo) => dispatch(salvarCategoria(elemento, novo)),
		salvarEntidade: (elemento, novo) => dispatch(salvarEntidade(elemento, novo)),
		salvarUsuario: (elemento, novo) => dispatch(salvarUsuario(elemento, novo)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ElementoSalvar)
