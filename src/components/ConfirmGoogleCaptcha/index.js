import Modal from 'react-native-modal';
import React, {Component} from 'react';
import GoogleReCaptcha from './GoogleReCaptcha';
import {View, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

class ConfirmGoogleCaptcha extends Component {
  state = {
    show: false,
  };
  show = () => {
    this.setState({show: true});
  };
  hide = () => {
    this.setState({show: false});
  };
  render() {
    let {show} = this.state;
    let {siteKey, baseUrl, languageCode, onMessage, cancelButtonText} =
      this.props;

    return (
      <Modal
        useNativeDriver
        isVisible={show}
        deviceWidth={width}
        animationIn="fadeIn"
        style={styles.modal}
        onDismiss={this.hide}
        deviceHeight={height}
        animationOut="fadeOut"
        onBackdropPress={this.hide}
        onBackButtonPress={this.hide}
        hideModalContentWhileAnimating>
        <GoogleReCaptcha
          url={baseUrl}
          siteKey={siteKey}
          onMessage={onMessage}
          languageCode={languageCode}
          cancelButtonText={cancelButtonText}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default ConfirmGoogleCaptcha;
