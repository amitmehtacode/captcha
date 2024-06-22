import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import CaptchaV2Lib2 from '../CaptchaV2Lib2';
import CaptchaV3Lib1 from '../CaptchaV3Lib1';
import {validateCaptchaToken} from '../../utils';

const HybridCaptcha = () => {
  const [token, setToken] = useState('');

  const handleCaptchaVerification = res => {
    console.log('res token------', res);
  };

  const handleValidateToken = isV2 => {
    validateCaptchaToken(isV2, token, handleCaptchaVerification);
  };

  return (
    <View style={styles.container}>
      <CaptchaV2Lib2
        getToken={val => {
          console.log('V2 Token--------->>>>>', val);
          setToken(val);
        }}
      />
      <CaptchaV3Lib1
        getToken={val => {
          console.log('V3 Token--------->>>>>', val);
          setToken(val);
        }}
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => handleValidateToken(true)}>
        <Text style={styles.txt}>Validate V2 Token</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => handleValidateToken(false)}>
        <Text style={styles.txt}>Validate V3 Token</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HybridCaptcha;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'orange',
  },
  txt: {
    fontSize: 15,
    fontWeight: '600',
  },
});
