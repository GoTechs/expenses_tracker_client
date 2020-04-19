import React, { Component } from "react";
import _ from "lodash";
import api from "../../Api/api";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loading";
import { toast } from "react-toastify";
import "./styles.css";

class ForgetPassword extends Component {
  state = {
    formConfig: {
      elementType: "input",
      label: "Email address*",
      elementConfig: {
        type: "email",
        placeholder: "",
      },
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      errorText: "You have entered an invalid email address",
      value: "",
    },
    loading: false,
  };

  inputChangedHandler = (e) => {
    const value = e.target.value;
    const updateFormConfig = { ...this.state.formConfig };
    updateFormConfig.value = value;
    updateFormConfig.touched = true;
    const rules = _.get(updateFormConfig, "validation");
    updateFormConfig.valid = this.checkValidity(value, rules);
    this.setState({ formConfig: updateFormConfig });
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, value } = this.state.formConfig;
    try {
      if (valid) {
        this.setState({ loading: true });
        const result = await api.post("/forgot-password", {
          loginId: value,
        });
        if (result && result.data.message) {
          toast.success(result.data.message);
          this.setState({ loading: false });
        }
      }
    } catch (error) {
      if (error.response) {
        //The request was made and the server responded with a status code
        //I realize that the backend don't handle the 404 status to redirect the user "page not found".
        //In case we want handle all the status error we can simply add a switch case for error.response.status.
        toast.error(error.response.data.error.message);
      } else {
        //Something happened in setting up the request that triggered an Error
        toast.error(error.message);
      }
      this.setState({ loading: false });
    }
  };

  render() {
    const { formConfig } = this.state;
    return (
      <div className="forget-password-container">
        {this.state.loading && <Loader />}
        <h1> Forget your password?</h1>
        <p>Please enter the email address register on your account.</p>
        <form onSubmit={this.handleSubmit} autoComplete="false">
          <Input
            elementType={_.get(formConfig, "elementType")}
            label={_.get(formConfig, "label")}
            elementConfig={_.get(formConfig, "elementConfig")}
            errorText={_.get(formConfig, "errorText")}
            value={_.get(formConfig, "value")}
            valid={_.get(formConfig, "valid")}
            shouldValidate={_.get(formConfig, "validation")}
            touched={_.get(formConfig, "touched")}
            changed={this.inputChangedHandler}
          />
          <Button
            primary
            type="submit"
            disabled={!this.state.formConfig.valid}
          >
            Reset password
          </Button>
        </form>
      </div>
    );
  }
}

export default ForgetPassword;
