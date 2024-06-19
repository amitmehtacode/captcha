import React, {useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import ReCaptchaV3 from '@haskkor/react-native-recaptchav3';
import {baseUrl, siteKeyV3} from '../../utils';

const CaptchaV3Lib1 = ({getToken}) => {
  const [show, setShow] = useState(false);

  const captchaRef = useRef(null);

  const handleTokenReceive = token => {
    getToken(token);
    captchaRef.current = token;
    setShow(false);
  };

  const handleRefreshToken = () => {
    setShow(true);
    if (captchaRef.current) {
      captchaRef.current.refreshToken();
    }
  };

  return (
    <View style={styles.container}>
      {show ? (
        <ReCaptchaV3
          ref={captchaRef}
          captchaDomain={baseUrl}
          siteKey={siteKeyV3}
          onReceiveToken={handleTokenReceive}
        />
      ) : null}

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleRefreshToken}>
        <Text style={styles.txt}>Open Captcha V3</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CaptchaV3Lib1;

const styles = StyleSheet.create({
  container: {},
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
