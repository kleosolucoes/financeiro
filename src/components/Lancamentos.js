import React from 'react'
import { connect } from 'react-redux'
import Lancamento from './Lancamento'

class Lancamentos extends React.Component {

	render() {
		const { 
			lancamentos, 
		} = this.props
		return (
			<div>
				{
					lancamentos &&
						lancamentos.map(lancamento => 
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

const mapStateToProps = state => {
	return {
		lancamentos: state.lancamentos,
	}
}

export default connect(mapStateToProps, null)(Lancamentos)
