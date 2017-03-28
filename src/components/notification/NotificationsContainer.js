import React, { PropTypes, Comoponent } from 'react';
import TransitionGroup from 'react-addons-css-transition-group';
import Notification from './Notification';

export class NotificationsContainer extends Comoponent {

  constructor(props) {
    super(props);

    this._renderNotifications = this._renderNotifications.bind(this);
  }

  static defaultProps = {
    notifications: []
  };

  _renderNotifications() {
    const {
      position,
      theme: {
        notification: { className }
      }
    } = this.props;

    return notifications.map((notification) => {
      <Notification
        key={notification.id}
        notification={notification}
        className={className}
      />
    });
  };

  render() {
    const {
      className,
      transition: {
        name,
        leaveTimeout,
        enterTimeout
      }
    } = this.props.theme.notificationsContainer;
    const { position } = this.props;

    return (
      <div className={`${className.main} ${className.position(position)}`}>
        <TransitionGroup
          transitionName={name}
          transitionEnterTimeout={enterTimeout}
          transitionLeaveTimeout={leaveTimeout}
        >
          {this._renderNotifications()}
        </TransitionGroup>
      </div>
    );
  };
}

NotificationsContainer.propTypes = {
  notifications: PropTypes.array.isRequired,
  position: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    notificationsContainer: PropTypes.shape({
      className: PropTypes.shape({
        main: PropTypes.string.isRequired,
        position: PropTypes.func.isRequired
      }).isRequired,
      transition: PropTypes.shape({
        name: PropTypes.string.isRequired,
        leaveTimeout: PropTypes.number.isRequired,
        enterTimeout: PropTypes.number.isRequired
      }).isRequired
    }).isRequired,
    notification: PropTypes.shape({
      className: PropTypes.object.isRequired
    }).isRequired
  }).isRequired
};

export default NotificationsContainer;
