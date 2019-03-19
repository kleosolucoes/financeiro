import React from 'react'
import {
	Row,
	Col,
} from 'reactstrap'
import { connect } from 'react-redux'

class Empresa extends React.Component {

	render() {
		const { 
			empresa, 
			empresaTipo, 
		} = this.props
		return (
			<div style={{padding:10, backgroundColor: '#f9f7f7', marginTop: 10}}>
				<Row style={{textAlign: 'center'}}>
					<Col> Nome <br/> {empresa && empresa.nome} </Col>
					<Col> Tipo <br/> {empresaTipo && empresaTipo.nome} </Col>
				</Row>
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
