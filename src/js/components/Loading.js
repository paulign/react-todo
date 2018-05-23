import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import spinner from '../../img/Spin-1s-63px.svg';

class Loading extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        let { isLoading } = this.props;
        console.log('isLoading ', isLoading)
        return (
            <Modal
                isOpen={isLoading}
                centered={true}
                backdropClassName={'loading-backdrop'}
                modalClassName={"loading-modal"}>
                <ModalBody>
                    <div className="text-center">
                        <img src={spinner} />
                    </div>
                </ModalBody>


            </Modal>
        );

    }
}

export default Loading;