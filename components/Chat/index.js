import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Chat = ({chat}) => {
  const {owner} = chat;
  const currentUser = auth().currentUser.uid;

  return owner === currentUser ? (
    <Sent chat={chat} />
  ) : (
    <Recieved chat={chat} />
  );
};

const Recieved = ({chat}) => {
    const styles = StyleSheet.create({
        rowStyle: {
            margin: 0,
            height: 75,
            width: '90%',
            marginRight: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            padding: 0,

        }
    })

};

const Sent = ({chat}) => {

};

export default Chat;