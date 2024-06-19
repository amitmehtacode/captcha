import React, {useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import ConfirmGoogleCaptcha from '../ConfirmGoogleCaptcha';
// import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import {baseUrl, siteKey, validateCaptchaToken} from '../../utils';

const CaptchaV2Lib1 = () => {
  const [token, setToken] = useState('');

  const captchaFormRef = useRef(null);

  const onMessage = event => {
    console.log('event--->>>>', event);

    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
        captchaFormRef.current.hide();
        return;
      } else {
        console.log('Verified code from Google', event.nativeEvent.data);
        setToken(event.nativeEvent.data);
        setTimeout(() => {
          captchaFormRef.current.hide();
          // do whatever you want here
        }, 1500);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ConfirmGoogleCaptcha
        ref={captchaFormRef}
        baseUrl={baseUrl}
        languageCode="en"
        onMessage={onMessage}
        siteKey={siteKey}
        theme="dark"
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          captchaFormRef.current.show();
        }}>
        <Text style={styles.txt}>Open Captcha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          validateCaptchaToken(token);
        }}>
        <Text style={styles.txt}>Validate Captcha</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CaptchaV2Lib1;

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    backgroundColor: 'orange',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 4,
  },
  txt: {
    fontSize: 15,
    fontWeight: '600',
  },
});
