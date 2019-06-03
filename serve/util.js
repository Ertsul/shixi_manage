// 密码加密
const crypto = require('crypto');  //加载crypto库
const sha256 = require('sha256');

module.exports = {
  /**
   * md5 hash 加密
   * @param str
   * @returns {string}
   */
  hashMd5Secret(str) {
    return crypto.createHash('md5').update(str).digest(str);
  },
  /**
   *
   * @param text：加密字符串
   * @param key：秘钥
   * @returns {{ciphertext: Buffer, tag: Buffer}}
   */
  cipher(text, key) {
    key = key || 'ErtsulErtsulErtsulErtsul';
    const nonce = crypto.randomBytes(12);
    const aad = Buffer.from('0123456789', 'hex');
    const cipher = crypto.createCipheriv('aes-192-ccm', key, nonce, {
      authTagLength: 16
    });
    // const plaintext = 'Hello world';
    cipher.setAAD(aad, {
      plaintextLength: Buffer.byteLength(text)
    });
    const ciphertext = cipher.update(text, 'utf8');
    cipher.final();
    const tag = cipher.getAuthTag();
    // console.log(ciphertext, tag);
    return {
      tag: tag,
      ciphertext
    }
  },
  /**
   *
   * @param tag
   * @param ciphertext
   * @param key
   * @returns {string}
   */
  decipher(tag, ciphertext, key) {

    key = key || 'ErtsulErtsulErtsulErtsul';
    const nonce = crypto.randomBytes(12);
    const aad = Buffer.from('0123456789', 'hex');
    const decipher = crypto.createDecipheriv('aes-192-ccm', key, nonce, {
      authTagLength: 16
    });
    decipher.setAuthTag(tag);
    decipher.setAAD(aad, {
      plaintextLength: ciphertext.length
    });
    const receivedPlaintext = decipher.update(ciphertext, null, 'utf8');

    try {
      decipher.final();
    } catch (err) {
      console.error('Authentication failed!', err);
    }

    console.log(receivedPlaintext);
    return receivedPlaintext;
  },
  pwdSalt(str) {
    // retrun sha256
  },
  /**
   *
   * @param length
   * @returns {*}
   */
  genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex') /**转成十六进制*/
      .slice(0, length);/**返回指定长度字符串*/
  }
};