import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import { createClip, updateClip, closeClipForm } from '../../actions';
import './ClipForm.css';

const isInteger = (string) => /^\d+$/.test(string);

const validateTitle = (values, errors) => {
  if (!values.title) {
    errors.title = 'The title is required';
  }
};

const validateStartTime = (values, errors) => {
  if (!values.startTime) {
    errors.startTime = 'The start time is required';
  } else if (!isInteger(values.startTime)) {
    errors.startTime = 'The start time must be a number of seconds';
  } else {
    const startTimeInt = Number(values.startTime);
    if (startTimeInt < 0) {
      errors.startTime = 'The start time is invalid';
    }
  }
};

const validateEndTime = (values, errors) => {
  if(!values.endTime) {
    errors.endTime = 'The end time is required';
  } else if (!isInteger(values.endTime)) {
    errors.endTime = 'The end time must be a number of seconds';
  } else {
    const startTimeInt = values.startTime && isInteger(values.startTime) ? Number(values.startTime) : 0;
    const endTimeInt = Number(values.endTime);
    if (endTimeInt <= startTimeInt) {
      errors.endTime = 'The end time must be after the start time';
    }
  }
};

const validate = (values) => {
  const errors = { };
  validateTitle(values, errors);
  validateStartTime(values, errors);
  validateEndTime(values, errors);
  return errors;
};

class ClipForm extends Component {
  constructor(props) {
    super(props);
    this.onDiscard = this.onDiscard.bind(this);
    this.onClipFormSubmit = this.onClipFormSubmit.bind(this);
  }

  validateValues(values) {
    const { video } = this.props;
    if (values.startTime > video.duration) {
      throw new SubmissionError({ startTime: 'The clip cannot start after the video ends' });
    } else if (values.endTime > video.duration) {
      throw new SubmissionError({ endTime: 'The clip cannot last longer than the video' });
    }
  }

  onClipFormSubmit(values) {
    this.validateValues(values);
    const { createClip, updateClip, reset, closeClipForm } = this.props;
    if (this.isCreatingNewClip()) {
      const { nextClipId } = this.props;
      const newClip = { ...values, id: nextClipId };
      createClip(newClip);
    } else {
      const { clipForm: { clipId } } = this.props;
      const clip = { ...values, id: clipId };
      updateClip(clipId, clip);
    }
    reset();
    closeClipForm();
  }

  isCreatingNewClip() {
    return typeof this.props.clipForm.clipId === 'undefined';
  }

  onDiscard() {
    const { reset, closeClipForm } = this.props;
    reset();
    closeClipForm();
  }

  static renderField({ input, placeholder, type, meta: { touched, error }}) {
    const shouldShowErrors = touched && error;
    return (
      <div className="form-group">
        <input {...input} placeholder={placeholder} type={type} className={`form-control ${shouldShowErrors && 'is-invalid'}`} />
        {shouldShowErrors && <div className="invalid-feedback">{error}</div>}
      </div>
    )
  }

  render() {
    const { handleSubmit, clipForm, submitting } = this.props;
    return (
      <div>
        <Modal isOpen={clipForm.showing} className={this.props.className}>
          <form onSubmit={handleSubmit(this.onClipFormSubmit)}>
            <ModalHeader toggle={this.onDiscard}>{this.isCreatingNewClip() ? 'New clip' : 'Editing clip'}</ModalHeader>
            <ModalBody>
              <div className="form-group">
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter the clip's title..."
                  component={ClipForm.renderField}
                />
              </div>
              <div className="form-row">
                <div className="col-md-6 col-xs-12">
                  <Field
                    name="startTime"
                    type="number"
                    placeholder="Start time (seconds)"
                    component={ClipForm.renderField}
                  />
                </div>
                <div className="col-md-6 col-xs-12">
                  <Field
                    name="endTime"
                    type="number"
                    placeholder="End time (seconds)"
                    component={ClipForm.renderField}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button onClick={this.onDiscard} type="button" className="btn btn-secondary">Discard</button>
              <button disabled={submitting} type="submit" className="btn btn-success">Save clip</button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nextClipId: state.clips.nextClipId,
    clipForm: state.clipForm,
    video: state.video,
  };
};

export default reduxForm({
  form: 'ClipForm',
  validate
})(
  connect(mapStateToProps, { createClip, updateClip, closeClipForm })(ClipForm),
);
