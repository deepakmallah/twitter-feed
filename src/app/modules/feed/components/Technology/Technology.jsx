import React from 'react';
import { Col } from 'antd';

import styles from './technology.css';

const component = ({ text, imgUrl }) => (
  <div className={styles.container}>
    <Col span={6} className={styles.column}>
      <img src={imgUrl} alt={text} height="120" />
      <p>{text}</p>
    </Col>
  </div>
);

component.propTypes = {
  text: React.PropTypes.string.isRequired,
  imgUrl: React.PropTypes.string.isRequired,
};

export default component;
