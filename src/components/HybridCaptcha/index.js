import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CaptchaV2Lib2 from '../CaptchaV2Lib2';
import CaptchaV3Lib1 from '../CaptchaV3Lib1';

const HybridCaptcha = () => {
  const onV2Press = () => {};

  const onV3Press = () => {};
  return (
    <View>
      <CaptchaV2Lib2 />
      <CaptchaV3Lib1 />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          //   captchaFormRef.current.show();
        }}>
        <Text style={styles.txt}>Validate Token</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HybridCaptcha;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'orange',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 4,
    marginBottom: 20,
  },
  txt: {
    fontSize: 15,
    fontWeight: '600',
  },
});
