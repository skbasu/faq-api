import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index.js'; 

const chai = use(chaiHttp);

describe('FAQ Routes', () => {
  it('should GET all FAQs', (done) => {
    chai
      .request(app)
      .keepOpen()
      .get('/api/faqs')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should POST a new FAQ', (done) => {
    const newFAQ = {
      question: 'What is testing?',
      answer: 'Testing is a process of validation.',
    };

    chai
      .request(app).keepOpen()
      .post('/api/faqs')
      .send(newFAQ)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('question', newFAQ.question);
        done();
      });
  });
});
