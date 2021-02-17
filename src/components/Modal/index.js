import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    position: 'absolute',
    top: ''
}

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
            return (
                <Modal>
                    <wrappedComponent {...props} togleModal={this.toggleModal}/>
                </Modal>
            )
        }
    }
}