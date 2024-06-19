import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

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
  },
});
