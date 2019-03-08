import React from 'react'
import { connect } from 'react-redux'
import Lancamento from './Lancamento'
import {
	Label,
	FormGroup,
	Input,
} from 'reactstrap'


class Lancamentos extends React.Component {

	state = {
		categoria_id: 0,
		empresa_id: 0,
	}

	ajudadorDeCampo = event => {
		let valor = event.target.value
		const name = event.target.name
		this.setState({[name]: valor})
	}

	render() {
		const { 
			lancamentos, 
			categorias,
			empresas,
			empresa_usuario_logado_id,
		} = this.props
		const {
			categoria_id,
			empresa_id,
		} = this.state

		let lancamentosFiltrados = lancamentos
		if(categoria_id && parseInt(categoria_id) !== 0){
			lancamentosFiltrados = lancamentosFiltrados
				.filter(lancamento => lancamento.categoria_id === parseInt(categoria_id))
		}
		if(empresa_id && parseInt(empresa_id) !== 0){
			lancamentosFiltrados = lancamentosFiltrados
				.filter(lancamento => lancamento.empresa_id === parseInt(empresa_id))
		}
		return (
			<div>
				<p>Filtro</p>
				<FormGroup>
					<Label for="categoria_id">Categoria</Label>
					<Input 
						type="select" 
						name="categoria_id" 
						id="categoria_id" 
						value={categoria_id} 
						onChange={this.ajudadorDeCampo}
					>
						<option value='0'>Todas</option>
						{
							categorias &&
								categorias.map(categoria => {
									return (
										<option 
											key={categoria.id}
											value={categoria.id}
										>
											{categoria.nome}
										</option>
									)
								})
						}
					</Input>
				</FormGroup>
				{
					empresa_usuario_logado_id === 1 && 

						<FormGroup>
							<Label for="empresa_id">Empresa</Label>
							<Input 
								type="select" 
								name="empresa_id" 
								id="empresa_id" 
								value={empresa_id} 
								onChange={this.ajudadorDeCampo}
							>
								<option value='0'>Todas</option>
								{
									empresas &&
										empresas.map(empresa => {
											return (
												<option 
													key={empresa.id}
													value={empresa.id}
												>
													{empresa.nome}
												</option>
											)
										})
								}
							</Input>
						</FormGroup>
				}
				{
					lancamentosFiltrados &&
						lancamentosFiltrados.map(lancamento => 
							<Lancamento 
								key={lancamento.id}
								lancamento_id={lancamento.id} 
							/>
						)
				}
			</div>

		)
	}
}

const mapStateToProps = (state, { empresa_id })  => {
	const usuarioLogado = state.usuarios
		.find(usuario => usuario.id === state.usuarioLogado.usuario_id)

	let lancamentos = state.lancamentos
	/* Tela de extrato da empresa */
	if(usuarioLogado.empresa_id !== 1){ // TODO empresa administracao
		lancamentos = state.lancamentos.filter(lancamento => lancamento.empresa_id === usuarioLogado.empresa_id)
	}
	return {
		lancamentos,
		categorias: state.categorias,
		empresas: state.empresas,
		empresa_usuario_logado_id: usuarioLogado.empresa_id,
	}
}

export default connect(mapStateToProps, null)(Lancamentos)
