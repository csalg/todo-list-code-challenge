import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import backendServices from "./backendServices";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.task
  }

  handleChange = e => {
    let { name: fieldName, value: updatedValue } = e.target;
    if (e.target.type === "checkbox") {
      updatedValue = e.target.checked;
    }
    this.setState({ [fieldName]: updatedValue  });
  };

  render() {
    const save = () => this.state.id ? backendServices.updateTask(this.state) : backendServices.createTask(this.state)
    const { toggle } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="Enter Todo Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="Enter Todo description"
              />
            </FormGroup>
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => {
            save(this.state)
                .then(toggle())
                .catch(console.log) // TODO: throws error
          }}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
