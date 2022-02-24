import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends React.Component {
        constructor(props){
            super(props)
            this.state = {
                isNavOpen: false,
                isModalOpen: false
            }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        console.log('contructor')
        }
        toggleModal() {
            console.log(this.state.isModalOpen)
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
        }
        handleSubmit(values) {
            console.log("current State is" + JSON.stringify(values))
            alert("current State is" + JSON.stringify(values))
        }

        render(){
            console.log('render')
            return(
                
                <div>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-comments"></span>Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(Values) => this.handleSubmit(Values)}>
                            <Row className='form-group'>
                                <Col>
                                <Label htmlFor='rating'>Rating</Label>
                                <Control.select model='.rating' id='rating' name='rating' className='form-control' >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col>
                                <Label htmlFor="yourname">Your Name</Label>
                                <Control.text model='.yourname' id='yourname' name='yourname' placeholder='Your Name' className='form-control' 
                                                validators={{minLength: minLength(3), maxLength: maxLength(15)}}
                                />
                                <Errors 
                                    className='text-danger'
                                    model='.yourname'
                                    show='touched'
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or les'
                                    }}
                                />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="8"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                   Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>
            )
        }



    }

    function RenderComments({comments}){
        return(    
            <div >
              <Card>
                  <CardBody>
                    <CardTitle style={{fontWeight: "600"}}>Comment</CardTitle>
                    <CardText>
                        {comments.map(el => 
                            <div key={el.id}>
                            <p>{el.comment}</p>
                            <p>--{el.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(el.date)))}</p>
                            </div>
                        )}
                    </CardText>
                  </CardBody>
                  
              </Card>
              <CommentForm />
            </div>
          );
    }     
    function RenderDish({dish}) {
        return(
                <div>
                    <Card>
                         <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle style={{fontWeight: "600"}}>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                        </Card>
                </div>
            )}

    const DishDetail = (props) => {
        if(props.dish != null){
            return(
                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
            )}
        return(<div></div>)
    }


export default DishDetail

