import test from 'ava';

import { isValidSignatureEncodingDER, range } from '../../../lib.js';

const minimumLengthSignature = Uint8Array.from([
  0x30, 0x06, 0x02, 0x01, 0x01, 0x02, 0x01, 0x01,
]);
const maximumLengthInteger = [0, ...range(32).map(() => 0x80)];
const maximumLengthSignature = Uint8Array.from([
  0x30,
  0x46,
  0x02,
  0x21,
  ...maximumLengthInteger,
  0x02,
  0x21,
  ...maximumLengthInteger,
]);
const oversizedInteger = [0, ...range(33).map(() => 0x80)];
const oversizedSignature = Uint8Array.from([
  0x30,
  0x47,
  0x02,
  0x22,
  ...oversizedInteger,
  0x02,
  0x21,
  ...maximumLengthInteger,
]);

test('isValidSignatureEncodingDER: length boundaries', (t) => {
  t.false(isValidSignatureEncodingDER(minimumLengthSignature.slice(0, -1)));
  t.true(isValidSignatureEncodingDER(minimumLengthSignature));
  t.true(isValidSignatureEncodingDER(maximumLengthSignature));
  t.false(isValidSignatureEncodingDER(oversizedSignature));
});
