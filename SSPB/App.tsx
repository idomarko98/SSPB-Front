/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';

import {Navigatiotr} from './components/test components/Navigator';

export const BASE_URL =
  'http://sspb-backend-prod.eu-west-1.elasticbeanstalk.com'; //todo: conplete

function App(): React.JSX.Element {
  // const navigation = useNavigation();

  return (
    // <NavigationContainer><MainTestPage navigation={navigation}/>
    // </NavigationContainer>
    <Navigatiotr />
  );
}

export default App;
