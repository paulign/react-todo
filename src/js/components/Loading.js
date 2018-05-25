import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import spinner from '../../img/loading-spinner.svg';

class Loading extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        let { isLoading } = this.props;
        console.log('isLoading ', isLoading);
        console.log(spinner);
        return (
            <Modal
                isOpen={isLoading}
                centered={true}
                backdropClassName={'loading-backdrop'}
                modalClassName={"loading-modal"}
                modalTransition={{
                    timeout: 10,
                    appear: false,
                }}>
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