import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, PermissionsAndroid, Platform } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';

const BluetoothScanner: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const manager = new BleManager();
    
    const subscription = manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        manager.startDeviceScan(null, null, (error, device) => {
            // console.log(device?.id);
            // console.log(device?.rawScanRecord);
            
          if (error) {
            console.error('Bluetooth scan error:', error);
            return;
          }
          // Process discovered devices
          setDevices((prevDevices) => {
            const existingDeviceIndex = prevDevices.findIndex((d) => d.id === device!.id);
            if (existingDeviceIndex !== -1) {
              const updatedDevices = [...prevDevices];
              updatedDevices[existingDeviceIndex] = device!;
              return updatedDevices;
            }
            return [...prevDevices, device!];
          });
        });
      }
    }, true);

    return () => {
      subscription.remove();
      manager.stopDeviceScan();
      manager.destroy();
    };
  }, []);

  return (
    <View>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id || ''}
        renderItem={({ item }) => (
          <View>
            <Text>Device</Text>
            <Text>{item.name}</Text>
            <Text>{item.id}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BluetoothScanner;
