import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { openNewClipForm } from '../../actions/clipFormActions';
import Clip from '../clip/Clip';
import ClipForm from '../clip-form/ClipForm';
import './ClipsList.css';

class ClipsList extends Component {
  renderList() {
    return _.map(this.props.clips, (clip) => {
      return (
        <Clip clip={clip} key={clip.id} />
      );
    });
  }

  render() {
    return (
      <div>
        <div className="list-group mb-4">
          {this.renderList()}
        </div>
        <button onClick={this.props.openNewClipForm} type="button" className="btn btn-primary">
          Create new clip
        </button>
        <ClipForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clips: state.clips
  };
};

export default connect(mapStateToProps, { openNewClipForm })(ClipsList);
