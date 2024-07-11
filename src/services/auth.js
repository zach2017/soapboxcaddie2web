import axios from 'axios';

const axiosInstance = axios.create({
  maxRedirects: 3, // Set the maximum number of redirects
});

export const twilioAuth = {
  isAuthenticated: false,
  phoneNumber: null,
  baseurl: null,

  async sendVerification(phoneNumber) {
    try {
      const baseurl = import.meta.env.VITE_API_URL;
      const apikey = import.meta.env.VITE_API_KEY;
      const data = new FormData();
      data.append('phone', phoneNumber)
      data.append('key', apikey)
      const response = await axiosInstance.post(`${baseurl}/getcode`,data);
      if (response.data.includes("Received:")) {
        this.phoneNumber = '+1' + phoneNumber;
        this.baseurl = baseurl
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error sending verification:', error);
      return false;
    }
  },

  async verifyCode(code, phoneNumber) {
    try {
      const baseurl = import.meta.env.VITE_API_URL;
      const apikey = import.meta.env.VITE_API_KEY;
      const data = new FormData();
      data.append('phone', phoneNumber)
      data.append('key', apikey)
      data.append('code',code)
      this.phoneNumber = phoneNumber
      const response = await axiosInstance.post(`${baseurl}/verify`,data);
      if (response.data.includes("approved")) {
        this.isAuthenticated = true;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error verifying code:', error);
      return false;
    }
  },

  signout(callback) {
    this.isAuthenticated = false;
    this.phoneNumber = null;
    setTimeout(callback, 100);
  }
};

