/**
 *
 * Button
 *
 */
import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import "./styles.css";

const button = (props) => {
  const label =
    !isEmpty(props.label) && !props.children ? (
      <span>{props.label}</span>
    ) : (
      props.children
    );

  return (
    <button
      className={`button ${props.primary && "primary"}`}
      type="button"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {label}
    </button>
  );
};

button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any,
  label: PropTypes.string,
  primary: PropTypes.bool,
  type: PropTypes.string,
};

export default button;