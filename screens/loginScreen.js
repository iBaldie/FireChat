import React from 'react';
import {View, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  // Initialize google sign in
  GoogleSignin.configure({
    webClientId:
      '65862726929-lop42c6n9rg2ait0nvt6ub6lld3jqc1l.apps.googleusercontent.com',
  });

  const handleLogin = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  googleButton: {},
});

export default LoginScreen;
