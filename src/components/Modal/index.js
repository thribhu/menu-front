import { Translate } from '@material-ui/icons';
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    tranform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '600px' }

function InModal(wrappedComponent, props){
    return class extends React.Component{
        constructor (props) {
            super(props)
            this.state = {
                isOpen: false
            }
        }
        toggleModal() {
            this.setState(state => {
                return {isOpen: !state.isOpen}
            })
        }
        componentDidMount() {
            this.toggleModal()
        }
        componentWillUnmount() {
            this.setState({
                isOpen: false
            })
        }
        render(){
            const {isOpen} = this.state
            return (
                <Modal
                style={customStyles}
                isOpen={isOpen}
                >
                    <wrappedComponent {...props} togleModal={this.toggleModal}/>
                </Modal>
            )
        }
    }
}