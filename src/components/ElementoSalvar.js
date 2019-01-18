import React from 'react'
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Alert,
	Row,
	Col,
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
		corDoBackGroundDoValor: '#fff',
		corDaFonteDoValor: '#000',
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

	 escolherCorDoBackGround = creditoOuDebito => {
		let corBackGround = ''
		let corDaFonte = ''
		if (creditoOuDebito === 'C'){
			corBackGround = '#28a745'
			corDaFonte = '#fff'
		}
		if (creditoOuDebito === 'D'){
			corBackGround = '#dc3545'
			corDaFonte = '#fff'
		}
		return [corBackGround, corDaFonte]
	}

	render() {
		const { tipo, esconderSalvar, categorias, situacoes } = this.props
		const { nome, categoria_id, valor, situacao_id, dia, mes, ano, descricao, mostrarMensagemDeError,
			categoriaValidade, valorValidade, situacaoValidade, diaValidade, mesValidade, anoValidade,
			 corDoBackGroundDoValor, corDaFonteDoValor} = this.state

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
										onChange={this.atualizarCampo}
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
										style={{height: '5rem', fontSize: '3rem', backgroundColor: corDoBackGroundDoValor, color: corDaFonteDoValor}}
										type="text"
										name="valor"
										id="valor"
										value={valor}
										bsSize='lg'
										onChange={this.atualizarCampo}
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
										onChange={this.atualizarCampo}
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
								<Row>
									<Col>
										<FormGroup>
											<Label for="dia">* Dia:</Label>
											<Input
												type="select"
												name="dia"
												id="dia"
												value={dia}
												onChange={this.atualizarCampo}
												invalid={diaValidade}
											>
												<option value='0'>Selecione</option>
												{
													arrayDias.map(dia => dia)
												}
											</Input>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup>
											<Label for="mes">* Mês:</Label>
											<Input
												type="select"
												name="mes"
												id="mes"
												value={mes}
												onChange={this.atualizarCampo}
												invalid={mesValidade}
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
												onChange={this.atualizarCampo}
												invalid={anoValidade}
											>
												<option value='0'>Selecione</option>
												{
													arrayAnos.map(ano => ano)
												}
											</Input>
										</FormGroup>
									</Col>
								</Row>
								<FormGroup>
									<Label for="descricao">Descrição</Label>
									<Input
										type="textarea"
										name="descricao"
										id="descricao"
										value={descricao}
										onChange={this.atualizarCampo}
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
									onChange={this.atualizarCampo}
								/>
							</FormGroup>
					}
					{
						(tipo === STRING_CATEGORIAS) &&
							<FormGroup>
								<Label for="tipo">Tipo</Label>
								<Input
									type="select"
									name="credito_debito"
									id="credito_debito"
								>
									<option value='C'>Recebimentos</option>
									<option value='D'>Desespesas</option>
								</Input>
							</FormGroup>
					}
					{
						mostrarMensagemDeError &&
						<Alert color='danger'>Preencha todos os dados com asteristicos</Alert>
					}
					<div style={{overflow: ' '}}>
					<Button color='success' style={{float: 'right', marginLeft: 10}} onClick={() => {this.ajudadorDeSubmit()}} >Cadastrar</Button>
				<Button style={{float: 'right', marginLeft: 10}} onClick={() => {esconderSalvar()}} >Voltar</Button>
				</div>
			</Form>
		</div>
		)
	}

	atualizarCampo = (event) => {
		let valor = event.target.value
		const name = event.target.name
		if(name === 'valor'){
			const valorInteiro = getMoney(valor) + ''
			const valorComZerosAEsquerda = valorInteiro.padStart(3, '0')
			valor = formatReal(valorComZerosAEsquerda)
		}
		if(name === 'categoria_id'){
			let novaCorDoBackGround = '#fff'
			let novaCorDaFonte = '#000'
			if(parseInt(valor) !== 0){
				const {categorias} = this.props
				const categoria = categorias.find(categoria => categoria.id === parseInt(valor))
				const resultado = this.escolherCorDoBackGround(categoria.credito_debito)
				novaCorDoBackGround = resultado[0]
				novaCorDaFonte = resultado[1]
			}
			this.setState({
				corDoBackGroundDoValor: novaCorDoBackGround,
				corDaFonteDoValor: novaCorDaFonte
			})
		}
		this.setState({[name]: valor})
	}

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
