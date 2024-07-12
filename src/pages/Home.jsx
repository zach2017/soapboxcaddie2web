import { Container, Row, Col, Image, Button } from 'react-bootstrap';

export default function Home() {
  return (
    <>
    <div class="container"><hr/></div>
      <div class="album bg-body-tertiary">
        <div >
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div class="col">
              <div class="card ">
                <center><img src="/caddie.PNG" width="200" height="300" /></center>
                <div class="card-body">
                  <p class="card-text">Wash-Dry-Fold
                  Your laundry will be picked up, washed in your choice of detergent, neatly folded and delivered right to your doorstep!</p>
                  <div class="d-flex justify-content-between align-items-center">
                  
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm">
                <center> <img src="/deliver.PNG" width="200" height="300" /></center>
                <div class="card-body">
                  <p class="card-text">Do you have loads of laundry left in a corner from wash day? Book this service and a VIP Caddie will be sent to your home to help you organize and declutter. This service includes hypo allergenic detergent and dryer balls to free your family from those harmful chemicals. You can book your caddie for up to 6 hours to assist you with all of your laundry needs.</p>
                  <div class="d-flex justify-content-between align-items-center">
                 
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card shadow-sm">
                <center><img src="/bag.PNG" width="200" height="300" /></center>
                <div class="card-body">
                  <p class="card-text">Let us help you take a load off! Soapbox Caddie provides an innovative, affordable, and convenient solution to our neighbors to eliminate the chore of doing laundry. Schedule a time for one of our "caddies" to pick up your laundry. Unless you request other detergents, we wash every load with organic, hypoallergenic detergents, safe for the whole family.</p>
                  <div class="d-flex justify-content-between align-items-center">
                   
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>);
}