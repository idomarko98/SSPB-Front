import React from 'react';
import {Navigatiotr} from './components/test components/Navigator';

export const BASE_URL =
  'http://sspb-backend-prod.eu-west-1.elasticbeanstalk.com'; //todo: conplete



function App(): React.JSX.Element {

  return (
    // <NavigationContainer><MainTestPage navigation={navigation}/>
    // </NavigationContainer>
    <Navigatiotr />
  );
}

export default App;
