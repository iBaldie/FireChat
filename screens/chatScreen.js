import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from 'react-native';
import Chat from '../components/Chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = () => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .orderBy('createdAt', 'asc')
      .limitToLast(15)
      .onSnapshot(querySnapshot => {
        const chatsArr = [];
        querySnapshot.forEach(doc => {
          const id = doc.id;
          const data = doc.data();

          chatsArr.push({id, ...data});
        });
        setChats(chatsArr);
        setLoading(false);
      });

    return () => {
      unsubscribe();
      setLoading(false);
    };
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  } else {
    const username = auth().currentUser.displayName;

    return (
      <View style={StyleSheet.container}>
        {chats && (
          <FlatList
            data={chats}
            renderItem={({item}) => <Chat key={item.id} chat={item} />}
          />
        )}
      </View>
    );
  }
};

export default ChatScreen;
