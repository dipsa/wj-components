import React, { Comoponent, PropTypes } from 'react';
import { connect } from 'react=redux';
import { Timer, mapObjectValues } from '../../helpers';
import { removeNotification } from '../../store/notifications';
import { POSITIONS } from '../../constants';

function createTimer(dismissAfter, callback) {
  if (dismissAfter > 0) {
    return new Timer(dismissAfter, callback);
  }
  return null;
}

export class Notification extends Component {

  constructor(props) {
    super(props);
    const { dismissAfter } = props.notification;
    this.state = {
      timer: createTimer(dismissAfter, this._remove);
    };
  }

  componentDidMount() {
    const { onAdd } = this.props.notification;

    if (typeof onAdd === 'function') {
      onAdd();
    }
  }

  componentWillUnmount() {
    const { onRemove } = this.props.notification;

    if (typeof onRemove === 'function') {
      onRemove();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dismissAfter } = nextProps.notification;

    this.setState({
      timer: createTimer(dismissAfter, this._remove);
    });
  }

  _remove() {
    const {
      removeNotification,
      notification: { id }
    } = this.props;

    removeNotification(id);
  }

  _pauseTimer() {
    const { timer } = this.state;
    timer.pause();
  }

  _resumeTimer() {
    const { timer } = this.state;
    timer.resume();
  }

  _setHTML(content) {

  }
}
