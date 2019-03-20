import React from 'react'
import { connect } from 'react-redux'

class Empresa extends React.Component {

	render() {
		const { 
			empresa, 
			empresaTipo, 
		} = this.props
		return (
			<tr style={{background: 'transparent'}}>
				<td style={{color: '#2f8c7c'}}>{empresa && empresa.nome}</td>
				<td>{empresaTipo && empresaTipo.nome}</td>
			</tr>
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
