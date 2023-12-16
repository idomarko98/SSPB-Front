import axios from 'axios';
import React, { useState } from 'react';
import {
    Button,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { BASE_URL } from '../../App';
import useSWR from 'swr'
import { BleManager } from 'react-native-ble-plx';
import BluetoothScanner from './BluetoothScanner';

function sendOpenCommand(barrierId: string, userId: string, command: string){
  axios.post(`${BASE_URL}/${barrierId}/${command}`, {
      "userId": userId
  })
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
}

export function DeviceStatusTestPageBluetooth(): JSX.Element {
  const [deviceBluetoothMacAddress, setDeviceBluetoothMacAddress] = useState("B2:5C:DA:F8:A3:67"/*"8C:3A:E3:45:EE:79"*/);
  const [userId, setUserId] = useState("user_id_1231");
  const fetcher = (url: string) => fetch(url).then((res) => { 
  return res.json()});
  const { data, error, isLoading } = useSWR(`${BASE_URL}/${deviceBluetoothMacAddress}/status`, fetcher, { refreshInterval: 1000 })
  
  const handleSendData = async (deviceMacAddress: string) => {
    const manager = new BleManager();
    
    try {
      const device = await manager.connectToDevice(deviceMacAddress/*"B2:5C:DA:F8:A3:67"*//*'CC:FA:00:75:9E:06'*/); // Replace with your device ID
      console.log('Connected to device:', device.name);

      const data = JSON.stringify({ key: 'value' });
      const serviceUUID = "12AA"//'0000180D-0000-1000-8000-00805F9B34FB'; // Replace with your service UUID
      const characteristicUUID = "12A1"//'0000180D-0000-1000-8000-00805F9B34FB'; // Replace with your characteristic UUID

      await device.writeCharacteristicWithResponseForService(serviceUUID, characteristicUUID, data);
      console.log('Data sent:', data);
    } catch (error) {
      console.error('Bluetooth communication error:', error);
      // console.log(error.reason)
    } finally {
      manager.destroy();
    }
  };

  // const requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: 'Camera Permission',
  //         message:
  //           'App needs access to your camera ' +
  //           'so you can take pictures.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');
  //     } else {
  //       console.log('Camera permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
  

  return (

    <SafeAreaView>
          <BluetoothScanner/>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View>
          <TextInput style={styles.input} placeholder='Bluetooth Mac Address' value={deviceBluetoothMacAddress} onChangeText={setDeviceBluetoothMacAddress}></TextInput>
          <TextInput editable={false} style={styles.input} placeholder='user id' value={userId} onChangeText={setUserId}></TextInput>
          <Button title='Open Device' onPress={() => /*sendOpenCommand(deviceId, userId, "open")*/handleSendData(deviceBluetoothMacAddress)}/>
          <Text></Text>
          {/* <Button title='Close Device' onPress={() => sendOpenCommand(deviceId, userId, "close")}/> */}
        </View>
        <View>
          <Text/>
          <Text/>
          <Text>Command Result:</Text>
          <Text>{data && JSON.stringify(data)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  }

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

