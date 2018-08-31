import React, { Component } from "react";
import { Consumer } from "../../context";
import axios from "axios";
import TextInputGroup from "../layout/TextInputGroup";

class EditContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: "",
      errors: {}
    };
  }
  async componentDidMount() {
    const { id } = this.props.match.params;

    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    //Check for errors
    if (name === "") {
      this.setState({ errors: { name: "Name Is Required" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email Is Required" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone Is Required" } });
      return;
    }

    const updContact = {
        name,
        email,
        phone
    }

    const {id} = this.props.match.params;

    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);

    dispatch({
        type: 'UPDATE_CONTACT',
        payload: res.data
    })

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };
  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Save Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
