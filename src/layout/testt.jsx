import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const TestEncryptDecrypt = () => {
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  const passphrase = 'LTC_Budget';

  const decryptData = (message) => {
    if (!message) {
      return 'Cannot decrypt!';
    }

    try {
      // MD5 Hash for the passphrase using CryptoJS
      const key = CryptoJS.MD5(passphrase).toString();

      // Replace Base64 URL encoding issues, then decode
      const base64Message = message.replace(/\s+/g, '+').replace(/-/g, '+').replace(/_/g, '/');
      const encryptedData = CryptoJS.enc.Base64.parse(base64Message);

      // Decrypt the message using TripleDES with CryptoJS
      const decrypted = CryptoJS.TripleDES.decrypt(
        { ciphertext: encryptedData },
        CryptoJS.enc.Hex.parse(key),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }
      );

      // Convert the decrypted message from WordArray to string
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      return decryptedText || 'Decryption failed!';
    } catch (error) {
      console.error('Error during decryption', error);
      return 'Decryption failed!';
    }
  };

  const encryptData = (message) => {
    if (!message) {
      return 'Cannot encrypt!';
    }

    try {
      // MD5 Hash for the passphrase using CryptoJS
      const key = CryptoJS.MD5(passphrase).toString();

      // Encrypt the message using TripleDES with CryptoJS
      const encrypted = CryptoJS.TripleDES.encrypt(message, CryptoJS.enc.Hex.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });

      // Convert the encrypted message to Base64 string
      const encryptedBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
      return encryptedBase64;
    } catch (error) {
      console.error('Error during encryption', error);
      return 'Encryption failed!';
    }
  };

  const handleDecrypt = () => {
    const result = decryptData(encryptedMessage);
    setDecryptedMessage(result);
  };

  const handleEncrypt = () => {
    const result = encryptData(inputMessage);
    setEncryptedMessage(result);
  };

  return (
    <div>
      <div>
        <h3>Encryption</h3>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Enter message to encrypt"
        />
        <button onClick={handleEncrypt}>Encrypt Message</button>
        <p>Encrypted Message: {encryptedMessage}</p>
      </div>

      <div>
        <h3>Decryption</h3>
        <input
          type="text"
          value={encryptedMessage}
          onChange={(e) => setEncryptedMessage(e.target.value)}
          placeholder="Enter message to decrypt"
        />
        <button onClick={handleDecrypt}>Decrypt Message</button>
        <p>Decrypted Message: {decryptedMessage}</p>
      </div>
    </div>
  );
};

export default TestEncryptDecrypt;
