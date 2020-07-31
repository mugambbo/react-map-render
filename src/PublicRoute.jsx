import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = (props) => {
    const { layout: Layout, component: ChildComponent, ...rest } = props;
    
    return (
      <Route render={matchProps => (
          <Layout {...rest} {...matchProps}  >
            <ChildComponent  {...rest} {...matchProps} />                         
          </Layout>
        )}
      />        
    );
}

PublicRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};
 
export default PublicRoute;