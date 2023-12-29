/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { COMMIT_SHA } from '@/config/env';
import apiUrlGenerator from '@/api/generator';
import styles from './styles.module.scss';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: props.roomId,
      abuseReported: false,
    };
  }

  handleUpdateRoomId(evt) {
    this.setState({
      roomId: evt.target.value,
    });
  }

  handleReportAbuse(evt) {
    evt.preventDefault();
    fetch(`${apiUrlGenerator('abuse')}/${this.state.roomId}`, {
      method: 'POST',
    });
    this.setState({
      abuseReported: true,
    });
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.links}>
          
          
        </div>

        

        <section id="software">
          <h4>Software</h4>
          <p>
            This software uses the{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto" target="_blank" rel="noopener noreferrer">
              Web Cryptography API
            </a>{' '}
            to encrypt data which is transferred using{' '}
            <a href="https://en.wikipedia.org/wiki/WebSocket" target="_blank" rel="noopener noreferrer">
              secure WebSockets
            </a>
            . Messages are never stored on a server or sent over the wire in plain-text.
          </p>
          <p>
            We believe in privacy and transparency. &nbsp;
            <a href="https://github.com/darkwire/darkwire.io" target="_blank" rel="noopener noreferrer">
              View the source code and documentation on GitHub.
            </a>
          </p>
        </section>

        <section id="donate">
          <h4>Donate</h4>
          <strong>Bitcoin</strong>
          <p>bc1qtcz4up6fe7c5yk34gugwenyyf7pel4znvwh9ap</p>
        </section>
      </div>
    );
  }
}

About.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default About;
