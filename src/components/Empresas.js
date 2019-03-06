import React from 'react'
import { connect } from 'react-redux'
import Empresa from './Empresa'

class Empresas extends React.Component {

	render() {
		const { 
			empresas, 
		} = this.props
		return (
			<div>
				{
					empresas.map(empresa => {
						return (
							<div key={empresa.id} style={{padding:10, backgroundColor: 'lightCyan', marginTop: 10}}>
								<Empresa 
									key={empresa.id}
									empresa_id={empresa.id}
								/>
							</div>
						)
					})
				}
			</div>

		)
	}

}

const mapStateToProps = state => {
	return {
		empresas: state.empresas,
	}
}

export default connect(mapStateToProps, null)(Empresas)
