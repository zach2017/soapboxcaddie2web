import { Container, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import { Form, FormGroup, FormSelect } from 'react-bootstrap';
import InHomeBuyButton from '../../components/InHomeBuyButton';
import MobilePickupBuyButton from '../../components/MobilePickupBuyButton';

export default function Signup() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    laundryService: '',
    laundrySize: '',
    laundryType: [], // Allow multiple selections
    detergent: '',
    bleach: '',
    waterPreference: '',
  });

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? event.target.checked : value,
    }));
  };

  const handleLaundryTypeChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      laundryType: [...prevData.laundryType, value],
    }));
  };

  const handleLaundryTypeRemove = (typeToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      laundryType: prevData.laundryType.filter((type) => type !== typeToRemove),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here (e.g., send data to server)
  };

  return (
    <Container>
      <Row>
        <Col>

          <Form className="laundry-form" onSubmit={handleSubmit}>
            <h2>Laundry Service Form</h2>
            <FormGroup as={Col} >
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </FormGroup>
            <FormGroup as={Col} >
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <label htmlFor="address">Home Address</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="city">Home City</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="state">Home State</label>
              <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} maxLength={2} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="zipcode">Home Zipcode</label>
              <input type="text" id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} pattern="[0-9]{5}" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="laundryService">Laundry Service Type</label>
              <FormSelect name="laundryService" value={formData.laundryService} onChange={handleChange} required>
                <option value="">Select Service</option>
                <option value="in-home">In Home Laundry</option>
                <option value="mobile">Mobile Pickup/Dropoff</option>
              </FormSelect>
            </FormGroup>
            {formData.laundryService === 'in-home' && (
              <div className="service-details in-home-details">
                <h4>In Home Laundry Details</h4>
                <p>Our professionals will come to your home to do your laundry.</p>
                <InHomeBuyButton />
              </div>
            )}

            {formData.laundryService === 'mobile' && (
              <div className="service-details mobile-details">
                <h4>Mobile Pickup/Dropoff Details</h4>
                <p>We'll pick up your laundry and return it clean and folded.</p>
                <MobilePickupBuyButton />
              </div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}