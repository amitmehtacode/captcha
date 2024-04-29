import React, {useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Recaptcha from 'react-native-recaptcha-that-works';
import {baseUrl, siteKey} from '../../utils';

const CaptchaV2Lib2 = () => {
  const recaptcha = useRef();

  const send = () => {
    console.log('send!');
    recaptcha.current.open();
  };

  const onVerify = token => {
    console.log('success!', token);
  };

  const onExpire = () => {
    console.warn('expired!');
  };

  return (
    <View>
      <Recaptcha
        ref={recaptcha}
        siteKey={siteKey}
        baseUrl={baseUrl}
        onVerify={onVerify}
        onExpire={onExpire}
        size="normal"
        theme="light"
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={send}>
        <Text style={styles.txt}>Open Captcha</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CaptchaV2Lib2;

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
  },
  txt: {
    fontSize: 15,
    fontWeight: '600',
  },
});
