import axios from 'axios';

const API_URL =  process.env.API_URL 

export const twilioAuth = {
  isAuthenticated: false,
  phoneNumber: null,

  async sendVerification(phoneNumber) {
    try {
      const response = await axios.get(`${API_URL}/getcode?phone=${phoneNumber}`);
      if (response.data.includes("Received:")) {
        this.phoneNumber = '+1' + phoneNumber;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error sending verification:', error);
      return false;
    }
  },

  async verifyCode(code) {
    try {
      const args = `${API_URL}/verify?phone=${this.phoneNumber}&code=${code}`
      this.phoneNumber = this.phoneNumber
      const response = await axios.get(args);
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

