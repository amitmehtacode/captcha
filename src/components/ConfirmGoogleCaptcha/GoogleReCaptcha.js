import React from 'react';
import WebView from 'react-native-webview';

const patchPostMessageJsCode = `(${String(function () {
  var originalPostMessage = window.ReactNativeWebView.postMessage;
  var patchedPostMessage = function (message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = function () {
    return String(Object.hasOwnProperty).replace(
      'hasOwnProperty',
      'postMessage',
    );
  };
  window.ReactNativeWebView.postMessage = patchedPostMessage;
})})();`;

/**
 *
 * @param {*} onMessage: callback after received response, error of Google captcha or when user cancel
 * @param {*} siteKey: your site key of Google captcha
 * @param {*} style: custom style
 * @param {*} url: base url
 * @param {*} languageCode: can be found at https://developers.google.com/recaptcha/docs/language
 */

const GoogleReCaptcha = ({url, style, siteKey, onMessage, languageCode}) => {
  const generateTheWebViewContent = _siteKey => {
    const originalForm = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://recaptcha.google.com/recaptcha/api.js?explicit&hl=${
      languageCode || 'en'
    }"></script>
    <script type="text/javascript">
        var onloadCallback = function() {};
        var onDataCallback = function(response) {
            window.ReactNativeWebView.postMessage(response);
            setTimeout(function () {
                document.getElementById('captcha').style.display = 'none';
            }, 1500);
        };
        var onCancel = function() {
            window.ReactNativeWebView.postMessage("cancel");
            document.getElementById('captcha').style.display = 'none';
        }
        var onDataExpiredCallback = function(error) {
            window.ReactNativeWebView.postMessage("expired");
        };
        var onDataErrorCallback = function(error) {
            window.ReactNativeWebView.postMessage("error");
        }
    </script>
    <style>
        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            background: #000000;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
        }

        #gradient {
            top: 0;
            left: 0;
            margin: 0;
            padding: 0;
            z-index: -1;
            height: 20%;
            width: 100%;
            position: absolute;
            background: linear-gradient(to top, #00000080, #390561);
        }

        #captcha-container {
            position: relative; /* Ensure relative positioning */
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }

        #captcha {
            padding: 20px;
            border-radius: 10px;
            background-color: white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .g-recaptcha {
            display: inline-block;
        }
    </style>
</head>
<body>
    <div id="gradient"></div>
    <div id="captcha-container">
        <div id="captcha">
            <div class="g-recaptcha"
                data-sitekey="${_siteKey}"
                data-callback="onDataCallback"
                data-expired-callback="onDataExpiredCallback"
                data-error-callback="onDataErrorCallback"
                data-size="normal">
            </div>
        </div>
    </div>
</body>
</html>

`;
    return originalForm;
  };
  return (
    <WebView
      originWhitelist={['*']}
      mixedContentMode={'always'}
      onMessage={onMessage}
      javaScriptEnabled
      injectedJavaScript={patchPostMessageJsCode}
      automaticallyAdjustContentInsets
      style={[{backgroundColor: 'transparent', width: '100%'}, style]}
      source={{
        html: generateTheWebViewContent(siteKey),
        baseUrl: `${url}`,
      }}
    />
  );
};

export default GoogleReCaptcha;
