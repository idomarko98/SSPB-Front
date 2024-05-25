import axios from 'axios';
import React, { useState } from 'react';
import {
    Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { BASE_URL } from '../../App';
import useSWR from 'swr'

function rebootBarrier(barrierId: string, userId: string, value: string){
  
  axios.post(`${BASE_URL}/${barrierId}/lock-state`, {
      "userId": userId,
      "cmd": value
  })
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
}

export function LockStateTestPage(): JSX.Element {
  const [deviceId, setDeviceId] = useState("");
  const [userId, setUserId] = useState("user_id_123");
  const [value, setValue] = useState("getLockState");
  const fetcher = (url: string) => fetch(url).then((res) => { 
  return res.json()});
  const { data, error, isLoading } = useSWR(`${BASE_URL}/${deviceId}/lock-state`, fetcher, { refreshInterval: 1000 })
  
  return (
    <SafeAreaView>
    
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View>
          <TextInput style={styles.input} placeholder='barrier id' value={deviceId} onChangeText={setDeviceId}></TextInput>
          <TextInput editable={false} style={styles.input} placeholder='user id' value={userId} onChangeText={setUserId}></TextInput>
          <TextInput style={styles.input} placeholder='cmd' value={value} onChangeText={setValue}></TextInput>
          <Button title='Send Command' onPress={() => rebootBarrier(deviceId, userId, value)}/>
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

