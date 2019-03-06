import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'
import { salvarCategoria } from '../actions'
import CategoriaSalvar from './CategoriaSalvar'

class Categorias extends React.Component {

	state = {
		mostrarAdicionar: false,
	}

	alternarMostrarAdicionar = () => this.setState({
		mostrarAdicionar: !this.state.mostrarAdicionar,
	})

	render() {
		const { 
			categorias, 
		} = this.props
		const {
			mostrarAdicionar,
		} = this.state
		return (
			<div>
				{
					mostrarAdicionar &&
						<CategoriaSalvar
							alternarMostrarAdicionar={this.alternarMostrarAdicionar}
						/>
				}
				{
					!mostrarAdicionar && 
						<div>
							<Row style={{padding: 5}}>
								<Col>
									<button 
										type='button' 
										style={{width: '100%'}} 
										onClick={this.alternarMostrarAdicionar}
									>
										Adicionar
									</button> 
								</Col>
							</Row>
							{
								categorias.map(categoria => {
									return (
										<div key={categoria.id} style={{padding:10, backgroundColor: 'lightCyan', marginTop: 10}}>
											<Row>
												<Col>
													Id
												</Col>
												<Col>
													{categoria.id.toString().padStart(8,0)}
												</Col>
											</Row>
											<Row>
												<Col>
													Data
												</Col>
												<Col>
													{categoria.data_criacao}
												</Col>
											</Row>
											<Row>
												<Col>
													Nome
												</Col>
												<Col>
													{categoria.nome}
												</Col>
											</Row>
											<Row>
												<Col>
													Credito/Debito
												</Col>
												<Col>
													{categoria.credito_debito === 'C' ? 'Credito' : 'Debito'}
												</Col>
											</Row>
										</div>
									)
								})
							}
						</div>
				}
			</div>

		)
	}

}

const mapStateToProps = state => {
	return {
		categorias: state.categorias,
	}
}

function mapDispatchToProps(dispatch){
	return {
		salvarCategoria: (elemento, novo) => dispatch(salvarCategoria(elemento, novo)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Categorias)
