import React from 'react';
import { Row } from 'antd';

import Technology from '../Technology';
import styles from './built-using.css';

const renderTechnologies = (tech, index) => {
  const { text, imgUrl } = tech;
  return <Technology text={text} imgUrl={imgUrl} key={index} />;
};

const component = ({ technologies }) => (
  <div className={styles.container}>
    <Row>
      <h1 className={styles.title}>Built using</h1>
      {technologies.map(renderTechnologies)}
    </Row>
  </div>
);

const technologyPropType = React.PropTypes.shape({
  text: React.PropTypes.string.isRequired,
  imgUrl: React.PropTypes.string.isRequired,
});

component.propTypes = { technologies: React.PropTypes.arrayOf(technologyPropType).isRequired };

export default component;
