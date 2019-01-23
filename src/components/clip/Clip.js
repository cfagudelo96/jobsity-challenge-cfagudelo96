import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectClip, openEditClipForm, deleteClip } from '../../actions';
import './Clip.css';

class Clip extends Component {
  constructor(props) {
    super(props);
    this.onSelectClip = this.onSelectClip.bind(this);
    this.onEditClip = this.onEditClip.bind(this);
    this.onDeleteClip = this.onDeleteClip.bind(this);
  }

  onSelectClip(e) {
    e.preventDefault();
    const { selectClip, clip } = this.props;
    selectClip(clip.id);
  }

  onEditClip() {
    const { openEditClipForm, clip } = this.props;
    openEditClipForm(clip.id);
  }

  onDeleteClip() {
    const { deleteClip, clip } = this.props;
    deleteClip(clip.id);
  }

  isSelectedClip() {
    const { selectedClipId, clip } = this.props;
    return clip.id === selectedClipId;
  }

  isFirstClip() {
    const { clip } = this.props;
    return clip.id === 0;
  }

  render() {
    const { clip } = this.props;
    return (
      <div className={`list-group-item d-flex justify-content-between ${this.isSelectedClip() && 'selected-list-group-item'}`}>
        <div>
          <h4 onClick={this.onSelectClip} className="clip-picker">{clip.title} <small>({clip.startTime} sec - {clip.endTime} sec)</small></h4>
        </div>
        <div className="float-right btn-group" role="group" aria-label="Clip controls">
          {!this.isFirstClip() && <button onClick={this.onEditClip} className="btn btn-sm btn-warning">Edit</button>}
          {!this.isFirstClip() && <button onClick={this.onDeleteClip} className="btn btn-sm btn-danger">Delete</button>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedClipId: state.clips.selectedClipId
  };
};

export default connect(mapStateToProps, { selectClip, openEditClipForm, deleteClip })(Clip);
