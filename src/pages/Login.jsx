import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { twilioAuth } from '../services/auth';
import { Form, Button, Alert } from 'react-bootstrap';

export default function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('phone');
  const [error, setError] = useState('');
  const baseurl = import.meta.env.VITE_API_URL;
  const handleSendVerification = async (e) => {
    e.preventDefault();
    setError('');
    const success = await twilioAuth.sendVerification(phoneNumber);
    if (success) {
      setStep('code');
    } else {
      setError('Failed to send verification code. Please try again.');
    }
  };


  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    let formatted = '';

    if (input.length > 0) {
      formatted += '(' + input.substr(0, 3);
      if (input.length > 3) {
        formatted += ') ' + input.substr(3, 3);
        if (input.length > 6) {
          formatted += '-' + input.substr(6, 4);
        }
      }
    }

    setPhoneNumber(formatted);
    setIsValid(input.length === 10);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    const success = await twilioAuth.verifyCode(verificationCode, phoneNumber);
    if (success) {
      navigate('/laundryservice');
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  return (
    <>
    <p>Login using your phone.   Enter phone number and it will send you a code.</p>
    <Form onSubmit={step === 'phone' ? handleSendVerification : handleVerifyCode}>
      {error && <Alert variant="danger">{error}</Alert>}
      {step === 'phone' ? (
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Cell Phone Number</Form.Label>
          <Form.Control 
            type="tel" 
            placeholder="Enter phone number" 
            value={phoneNumber}
            onChange={handlePhoneChange}
            //onChange={(e) => setPhoneNumber(e.target.value)}
            required 
            style={{ width: '15ch' }}
          />
          <Button variant="primary" type="submit" className="mt-3">
            Send Verification Code
          </Button>
        </Form.Group>
      ) : (
        <Form.Group className="mb-3" controlId="formBasicCode">
          <Form.Label>Verification Code</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter verification code" 
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required 
          />
          <Button variant="primary" type="submit" className="mt-3"  disabled={!isValid}>
            Verify Code
          </Button>
        </Form.Group>
      )}
    </Form>
    </>
  );
}