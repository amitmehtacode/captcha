export const siteKey = '6Ld_CsgpAAAAAK6U9yiR4h8YkdKM9dwws3FpTZkL'; // Place your reCAPTCHA site key here
export const baseUrl = 'https://royallarchitecture.co.uk/'; // Place your server's base URL here
const SITE_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
export const siteKeyV3 = '6LeZuMwpAAAAAJBayu-9rw3P2fKUp_RnClT7K4LY'; // Place your reCAPTCHA 3 site key here

export const validateCaptchaToken = async (isV2, token = '', callback = {}) => {
  const params = {
    secret: isV2 ? siteKey : siteKeyV3,
    response: token,
  };

  try {
    const postData = new URLSearchParams(params).toString();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const response = await fetch(SITE_VERIFY_URL, {
      ...options,
      body: postData,
    });

    console.log('res----->>>>', response);

    if (response?.ok && response?.status === 200) {
      let r = await response?.json();


      console.log('r00000000', r)

      callback(response);
      // do you code here
    } else {
      callback(response);
      // handle the failure case here
    }
  } catch (error) {
    callback({});
    // handle the failure case here
  }
};
