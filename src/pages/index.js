import React, { PureComponent } from 'react';
import { Redirect } from 'umi';

class Index extends PureComponent {
  render() {
    return <Redirect to="/tips" />;
  }
}
export default Index;
