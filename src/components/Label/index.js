import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Label extends Component {
  render() {
    const {
      text, type, name, dataTest, placeholder, value, onChange, className,
    } = this.props;
    return (
      <span>
        <input
          autoComplete="off"
          className={ className }
          type={ type }
          name={ name }
          id={ name }
          value={ value }
          onChange={ onChange }
          data-testid={ dataTest }
          placeholder={ placeholder }
        />
        <label htmlFor={ name }>{ text }</label>
      </span>
    );
  }
}

Label.propTypes = {
  type: propTypes.string,
  name: propTypes.string,
  text: propTypes.string,
  dataTest: propTypes.string,
  placeholder: propTypes.string,
}.isRequired;
