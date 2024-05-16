import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  NativeModules,
} from 'react-native';
import React, {useEffect} from 'react';
import CaptchaV2Lib1 from './src/components/CaptchaV2Lib1';
import CaptchaV2Lib2 from './src/components/CaptchaV2Lib2';
import HybridCaptcha from './src/components/HybridCaptcha';

const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      {/* <CaptchaV2Lib2 /> */}
      <HybridCaptcha />
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
    fontWeight: 'bold',
  },
});
