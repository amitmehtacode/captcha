/**
 * Type definitions
 */
const PayloadClose = {
  close: [],
};

const PayloadError = {
  error: [null],
};

const PayloadLoad = {
  load: [],
};

const PayloadExpire = {
  expire: [],
};

const PayloadVerify = {
  verify: [''],
};

/**
 * MessageReceivedPayload type
 */
export const MessageReceivedPayload = [
  PayloadClose,
  PayloadError,
  PayloadLoad,
  PayloadExpire,
  PayloadVerify,
];

/**
 * Type guard functions
 */
export const isPayloadClose = payload => {
  return 'close' in payload;
};

export const isPayloadError = payload => {
  return 'error' in payload;
};

export const isPayloadLoad = payload => {
  return 'load' in payload;
};

export const isPayloadExpire = payload => {
  return 'expire' in payload;
};

export const isPayloadVerify = payload => {
  return 'verify' in payload;
};
