export const validations = {
  checkNull(value) {
    const pattern = /.+/g;
    return pattern.test(value);
  },
  checkEmail(value) {
    const pattern =
      /^([A-Z\w\d\._-]{5,32})@([a-z0-9\-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    return pattern.test(value);
  },
  checkPhoneNumber(value) {
    let pattern = /^[0]\d{9}$/;
    return pattern.test(value);
  },
  checkNumber(value) {
    if (isNaN(value)) {
      return false;
    } else {
      return true;
    }
  },
  checkPrice(value) {
    if (value > 0) {
      return true;
    } else {
      return false;
    }
  },
  checkBlankSpace(value) {
    const pattern = /\s+$/;
    if (pattern.test(value)) {
      return false;
    } else {
      return true;
    }
  },
};
export const patterns = {
  phonePattern: /^[0]\d{9}$/,
  emailPattern:
    /^([A-Z\w\d\._-]{2,32})@([a-z0-9\-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
};
