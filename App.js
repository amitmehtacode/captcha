import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CaptchaV2Lib1 from './src/components/CaptchaV2Lib1';
import CaptchaV2Lib2 from './src/components/CaptchaV2Lib2';
import CaptchaV3Lib1 from './src/components/CaptchaV3Lib1';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>reCAPTCHA V2</Text>
      <CaptchaV2Lib2 />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    marginTop: 50,
    fontSize: 22,
    fontWeight: 'bold'
  },
});
