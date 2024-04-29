import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';

import {siteKey, baseUrl} from '../../utils';
// import ReCaptchaV3 from '@haskkor/react-native-recaptchav3';

const CaptchaV3Lib1 = () => {
  const captchaRef = useRef(null);

  const handleTokenReceive = token => {
    Alert.alert('CAPTCHA Token', token);
  };

  const handleRefreshToken = () => {
    if (captchaRef.current) {
      captchaRef.current.refreshToken();
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <ReCaptchaV3
        ref={captchaRef}
        captchaDomain={baseUrl}
        siteKey={siteKey}
        onReceiveToken={handleTokenReceive}
      />
      <TouchableOpacity onPress={handleRefreshToken}>
        <Text>Refresh Captcha</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default CaptchaV3Lib1;

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
