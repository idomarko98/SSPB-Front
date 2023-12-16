import React from 'react';
import {
    Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

interface Props {
    navigation: any
}

export function MainTestPage({navigation} : Props) {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  return (
    <SafeAreaView style={backgroundStyle}>
    
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
         
        <Button title='Test set device status' onPress={() => navigation.navigate("DeviceStatusTestPage")}/>
        <Text/>
        <Button title='Test set device status Bluetooth' onPress={() => navigation.navigate("DeviceStatusTestPageBluetooth")}/>
        <Text/>
        <Button title='Test reboot' onPress={() => navigation.navigate("Test Reboot")}></Button>
        <Text/>
        <Button title='Test set battery alert' onPress={() => navigation.navigate("Test Set Battery Alert")}></Button>
        <Text/>
        <Button title='Test server address' onPress={() => navigation.navigate("Test server address")}></Button>
        <Text/>
        <Button title='Test autolock' onPress={() => navigation.navigate("Test autolock")}></Button>
        <Text/>
        <Button title='Test alarm status' onPress={() => navigation.navigate("Test alarm status")}></Button>
        <Text/>
        <Button title='Test autosensor' onPress={() => navigation.navigate("Test autosensor")}></Button>
        <Text/>
        <Button title='Test alarm pitch' onPress={() => navigation.navigate("Test alarm pitch")}></Button>
        <Text/>
        <Button title='Test disengage' onPress={() => navigation.navigate("Test disengage")}></Button>
        <Text/>
        <Button title='Test barrier status' onPress={() => navigation.navigate("Test barrier status")}></Button>
        <Text/>
        <Button title='Test general failure' onPress={() => navigation.navigate("Test general failure")}></Button>
        
         <Text/>
        <Button title='Test battery status' onPress={() => navigation.navigate("Test battery status")}></Button>
        <Text/>
        <Button title='Test device status autoupdate' onPress={() => navigation.navigate("Test device status autoupdate")}></Button>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

