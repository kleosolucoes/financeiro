import React from 'react'
import {
	Row,
	Col,
	Button
} from 'reactstrap'
import { connect } from 'react-redux'
import Usuarios from './Usuarios'
import ContasFixas from './ContasFixas'

class Empresa extends React.Component {

	state = {
		mostrarTodosOsDados: false,
	}

	alternarMostrarTodosOsDados = () => this.setState({mostrarTodosOsDados: !this.state.mostrarTodosOsDados})

	render() {
		const { 
			empresa, 
			empresaTipo, 
		} = this.props
		return (
			<div style={{padding:10, backgroundColor: '#f9f7f7', marginTop: 10}}>
				<Row style={{textAlign: 'center'}}>
					<Col> Nome <br/> {empresa.nome} </Col>
				
					<Col> Tipo <br/> {empresaTipo.nome} </Col>
				</Row>

				<div style={{padding: 10}}>
					<Row>
						<Col>
							<Button 
								type='button' 
								style={{width: '100%'}}
								onClick={this.alternarMostrarTodosOsDados}
							>
								Mostrar todos dados
							</Button>
						</Col>
					</Row>
				</div>
				{
					this.state.mostrarTodosOsDados &&
						<div>
							<Usuarios
								empresa_id={empresa._id}
							/>
							<ContasFixas
								empresa_id={empresa._id}
							/>
						</div>
				}
			</div>
		)
	}
}

const mapStateToProps = (state, { empresa_id }) => {
	const empresa = state.empresas
		.find(empresa => empresa._id === empresa_id)
	const empresaTipo = state.empresaTipo
		.find(empresaTipo => empresaTipo._id === empresa.empresa_tipo_id)
	return {
		empresa,
		empresaTipo,
	}
}

export default connect(mapStateToProps, null)(Empresa)
