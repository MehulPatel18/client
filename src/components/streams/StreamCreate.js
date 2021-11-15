import React from 'react';
import { Field, formValues, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStreams } from '../../actions';

class StreamCreate extends React.Component {

  renderError ({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, lable, meta }) => {  //we destructured formProps.input
    const classname = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={ classname }>
        <lable>{ lable }</lable>
        <input { ...input } autoComplete="off" />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  }

  onSubmit = (formProps) => {
    // console.log(formProps);
    this.props.createStreams(formProps);
  }

  render() {
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} lable="Enter Title" />
        <Field name="description" component={this.renderInput} lable="Enter Description" />
        <button className="ui button primary" >Submit</button>
      </form>
    );
  };
};

const validate = formValues => {
  const errors = {};
  
  if (!formValues.title) {
      errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  
  return errors;
}

const formWrapped = reduxForm({
  form: 'streamCreate',
  validate: validate
})(StreamCreate);

export default connect(null, { createStreams })(formWrapped);
