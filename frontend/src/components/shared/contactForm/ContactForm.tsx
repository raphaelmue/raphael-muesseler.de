import React                                               from 'react';
import Content                                             from '../content/Content';
import {Button, Col, Form, FormGroup, Input, Row, Spinner} from 'reactstrap';
import ApiFactory                                          from '../../../api/ApiFactory';
import {NewContactRequests}                                     from '../../../.openapi';
import {WithTranslation, withTranslation, WithTranslationProps} from 'react-i18next';

interface ContactFormComponentProps extends WithTranslation {
}

interface ContactFormComponentState {
    isLoading: boolean;
    contactRequestData: NewContactRequests;
}

const initialState: ContactFormComponentState = {
    isLoading: false,
    contactRequestData: {
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    }
};

class ContactForm extends React.Component<ContactFormComponentProps, ContactFormComponentState> {
    constructor(props: ContactFormComponentProps) {
        super(props);

        this.state = initialState;
    }


    createContactRequest() {
        if (this.state.contactRequestData.firstName !== '' &&
            this.state.contactRequestData.lastName !== '' &&
            this.state.contactRequestData.email !== '' &&
            this.state.contactRequestData.message !== '') {

            this.setState({isLoading: true});
            ApiFactory.getInstance().getContactRequestsApi().contactRequestsPost(this.state.contactRequestData).then(() => {
                this.setState(initialState);
            });
        }
    }

    onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => this.setState(previousState => ({
        contactRequestData: {
            ...previousState.contactRequestData,
            [event.target.id]: event.target.value
        }
    }));

    render() {
        return (
            <Content title={this.props.t('Contact.Title')}>
                <Form>
                    <Row className="justify-content-md-center">
                        <Col lg={8}>
                            <Row>
                                <Col xs={6}>
                                    <FormGroup>
                                        <Input
                                            className={'form-control-alternative'}
                                            placeholder={this.props.t('Contact.Form.FirstName')}
                                            id={'firstName'}
                                            value={this.state.contactRequestData.firstName}
                                            onChange={this.onChangeInput}/>
                                    </FormGroup>
                                </Col>
                                <Col xs={6}>
                                    <FormGroup>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder={this.props.t('Contact.Form.LastName')}
                                            id={'lastName'}
                                            value={this.state.contactRequestData.lastName}
                                            onChange={this.onChangeInput}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder={this.props.t('Contact.Form.Email')}
                                            id={'email'}
                                            value={this.state.contactRequestData.email}
                                            onChange={this.onChangeInput}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Input
                                            className="form-control-alternative"
                                            placeholder={this.props.t('Contact.Form.YourMessage')}
                                            rows="3"
                                            type="textarea"
                                            id={'message'}
                                            value={this.state.contactRequestData.message}
                                            onChange={this.onChangeInput}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md={2}>
                                    <Button color="info" type="button"
                                            onClick={this.createContactRequest.bind(this)}>
                                        {this.props.t('General.Form.Button.Send')}
                                        <Spinner style={{display: this.state.isLoading ? 'inherit' : 'none'}}/>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Content>
        );
    }

}

export default withTranslation()(ContactForm);
