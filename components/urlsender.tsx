import axios from 'axios';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

function bla(){
axios.get('http://192.168.1.136:8080/bla').then(function (response) {
    console.log(response);
    console.log("jjj");
    
})
.catch(function (error) {
    console.log(error);
})
.then(function () {
    // always executed
});  
}

function sendOpenCommand(barrierId: string, userId: string){
    axios.post(`http://192.168.1.136:8080/${barrierId}/open`, {
        "userId": userId
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function UrlSender () {
    const [deviceId, setDeviceId] = useState("");
    const [userId, setUserId] = useState("");


    return <>
    <TextInput style={styles.input} placeholder='device id' value={deviceId} onChangeText={setDeviceId}></TextInput>
    <TextInput style={styles.input} placeholder='user id' value={userId} onChangeText={setUserId}></TextInput>
    <Button title='send' onPress={() => sendOpenCommand(deviceId, userId)}/>
     </>
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });