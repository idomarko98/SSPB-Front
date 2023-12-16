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

function rebootBarrier(barrierId: string, userId: string){
  axios.post(`${BASE_URL}/${barrierId}/reboot`, {
      "userId": userId
  })
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
}

export function RebootTestPage(): JSX.Element {
  const [deviceId, setDeviceId] = useState("");
  const [userId, setUserId] = useState("user_id_123");
  const fetcher = (url: string) => fetch(url).then((res) => { 
  return res.json()});
  const { data, error, isLoading } = useSWR(`${BASE_URL}/${deviceId}/reboot`, fetcher, { refreshInterval: 1000 })
  
  return (
    <SafeAreaView>
    
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View>
          <TextInput style={styles.input} placeholder='barrier id' value={deviceId} onChangeText={setDeviceId}></TextInput>
          <TextInput editable={false} style={styles.input} placeholder='user id' value={userId} onChangeText={setUserId}></TextInput>
          <Button title='Reboot Device' onPress={() => rebootBarrier(deviceId, userId)}/>
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

