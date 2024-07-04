import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { twilioAuth } from '../services/auth';
import { Form, Button, Alert } from 'react-bootstrap';

export default function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('phone');
  const [error, setError] = useState('');

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

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    const success = await twilioAuth.verifyCode(verificationCode);
    if (success) {
      navigate('/protected1');
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  return (
    <Form onSubmit={step === 'phone' ? handleSendVerification : handleVerifyCode}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      {step === 'phone' ? (
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Mobile Phone Number</Form.Label>
          <Form.Control 
            type="tel" 
            placeholder="Enter phone number" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required 
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
          <Button variant="primary" type="submit" className="mt-3">
            Verify Code
          </Button>
        </Form.Group>
      )}
    </Form>
  );
}