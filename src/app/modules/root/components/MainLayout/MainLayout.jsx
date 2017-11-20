import React from 'react';
import { Layout } from 'antd';

import Header from '../Header';
import styles from './main-layout.css';

const { Content, Footer } = Layout;

const component = ({ children }) => (
  <Layout className="layout">
    <Header />
    <Content className={styles.content}>
      <div className={styles.innerContent}>
        {children}
      </div>
    </Content>
    <Footer className={styles.footer}>
      Twitter feed - Footer
    </Footer>
  </Layout>
);

component.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

component.defaultProps = {
  // or [] I guess
  children: null,
};

export default component;
