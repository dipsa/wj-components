import React, { Comoponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { mapObjectValues } from '../../helpers';
import POSITIONS from '../../constants';

import NotificationsContainer from './NotificationsContainer';


export class NotificationsManager extends Comoponent {

  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth
    };

    this._updateWindowWidth = this._updateWindowWidth.bind(this);
    this._renderNotificationsContainers = this._renderNotificationsContainers.bind(this);
  }

  static defaultProps = {
    notifications: []
  };

  componentDidMount() {
    window.addEventListener('resize', this._updateWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateWindowWidth);
  }

  _updateWindowWidth() {
    this.setState({windowWidth: window.innerWidth});
  }

  _renderNotificationsContainers() {
    const { notifications, theme } = this.props;
    const { windowWidth } = this.state;
    const positions = mapObjectValues(POSITIONS);
    const containers = [];

    //arrange seperate containers for different positions
    containers.push(positions.map((position) => {
      const filteredNotifications = notifications.filter((notification) => {
        return position === notification.position;
      });

      return (
        <NotificationsContainer
          key={position}
          position={position}
          theme={theme}
          notifications={filteredNotifications}
        />
      );
    }));

    return containers;
  };

  render() {
    const { className } = this.props.theme.notificationsManager;

    return (
      <div className={className}>
        {this._renderNotificationsContainers()}
      </div>
    );
  }
}

NotificationsManager.propTypes = {
  notifications: PropTypes.array.isRequired,
  theme: PropTypes.shape({
    smallScreenMin: PropTypes.number.isRequired,
    notificationsManager: PropTypes.shape({
      className: PropTypes.string
    })
  }).isRequired
};

function mapStateToProps(state) {
  return {
    notifications: state.notifications
  }
}


export default connect(mapStateToProps)(NotificationsManager);
