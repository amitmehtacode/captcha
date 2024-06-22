import React, {
  useRef,
  useMemo,
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from 'react';
import WebView from 'react-native-webview';
import {View, Modal, StyleSheet, ActivityIndicator} from 'react-native';

import {
  isPayloadLoad,
  isPayloadClose,
  isPayloadError,
  isPayloadVerify,
  isPayloadExpire,
} from './utils';
import getTemplate from './get-template';

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const originWhitelist = ['*'];

const Recaptcha = forwardRef(
  (
    {
      headerComponent,
      footerComponent,
      loadingComponent,
      webViewProps,
      modalProps,
      onVerify,
      onExpire,
      onError,
      onClose,
      onLoad,
      theme = 'light',
      size = 'normal',
      siteKey,
      baseUrl,
      lang,
      style,
      enterprise = false,
      recaptchaDomain = 'www.google.com',
      gstaticDomain = 'www.gstatic.com',
      hideBadge = false,
      action,
    },
    ref,
  ) => {
    const isClosed = useRef(true);
    const webViewRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const isInvisibleSize = size === 'invisible';

    const html = useMemo(() => {
      return getTemplate(
        {
          siteKey,
          size,
          theme,
          lang,
          action,
        },
        recaptchaDomain,
        gstaticDomain,
        enterprise,
        hideBadge,
      );
    }, [
      siteKey,
      size,
      theme,
      lang,
      action,
      enterprise,
      recaptchaDomain,
      gstaticDomain,
      hideBadge,
    ]);

    const handleLoad = useCallback(() => {
      onLoad?.();

      if (isInvisibleSize) {
        webViewRef.current?.injectJavaScript(`
          window.rnRecaptcha.execute();
        `);
      }

      setLoading(false);
    }, [onLoad, isInvisibleSize]);

    const handleClose = useCallback(() => {
      if (isClosed.current) {
        return;
      }
      isClosed.current = true;
      setVisible(false);
      onClose?.();
    }, [onClose]);

    const handleMessage = useCallback(
      event => {
        try {
          const payload = JSON.parse(event.nativeEvent.data);

          if (isPayloadClose(payload) && isInvisibleSize) {
            handleClose();
          }
          if (isPayloadLoad(payload)) {
            handleLoad();
          }
          if (isPayloadExpire(payload)) {
            onExpire?.();
          }
          if (isPayloadError(payload)) {
            handleClose();
            onError?.(...payload.error);
          }
          if (isPayloadVerify(payload)) {
            handleClose();
            onVerify?.(...payload.verify);
          }
        } catch (err) {
          if ('__DEV__' in global && __DEV__) {
            console.warn(err);
          }
        }
      },
      [onVerify, onExpire, onError, handleClose, handleLoad, isInvisibleSize],
    );

    const source = useMemo(
      () => ({
        html,
        baseUrl,
      }),
      [html, baseUrl],
    );

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          setVisible(true);
          setLoading(true);
          isClosed.current = false;
        },
        close: handleClose,
      }),
      [handleClose],
    );

    const handleNavigationStateChange = useCallback(() => {
      // prevent navigation on Android
      if (!loading) {
        webViewRef.current?.stopLoading();
      }
    }, [loading]);

    const handleShouldStartLoadWithRequest = useCallback(event => {
      // prevent navigation on iOS
      return event.navigationType === 'other';
    }, []);

    const webViewStyles = useMemo(() => [styles.webView, style], [style]);

    const renderLoading = () => {
      if (!loading && source) {
        return null;
      }
      return (
        <View style={styles.loadingContainer}>
          {loadingComponent || (
            <ActivityIndicator color="#ffffff" size="large" />
          )}
        </View>
      );
    };

    return (
      <Modal
        transparent
        {...modalProps}
        visible={visible}
        onRequestClose={handleClose}>
        {headerComponent}
        <WebView
          bounces={false}
          allowsBackForwardNavigationGestures={false}
          originWhitelist={originWhitelist}
          onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
          onNavigationStateChange={handleNavigationStateChange}
          {...webViewProps}
          source={source}
          style={webViewStyles}
          onMessage={handleMessage}
          ref={webViewRef}
        />
        {footerComponent}
        {renderLoading()}
      </Modal>
    );
  },
);

export default Recaptcha;
