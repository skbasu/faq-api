import mongoose from 'mongoose';
import { expect } from 'chai';
import FAQ from '../../models/faqModel.js';
import dotenv from 'dotenv';

//const { expect } = chai;
dotenv.config();

describe('FAQ Model', () => {
  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create and save an FAQ successfully', async () => {
    const faqData = {
      question: 'What is Node.js?',
      answer: 'Node.js is a JavaScript runtime.',
      question_hi: 'Node.js क्या है?',
      answer_hi: 'Node.js एक जावास्क्रिप्ट रनटाइम है।',
      question_bn: 'Node.js কী?',
      answer_bn: 'Node.js একটি জাভাস্ক্রিপ্ট রানটাইম।',
    };

    const faq = new FAQ(faqData);
    const savedFAQ = await faq.save();

    expect(savedFAQ._id).to.exist;
    expect(savedFAQ.question).to.equal(faqData.question);
  });

  it('should fail validation without a required field', async () => {
    const faqData = {
      answer: 'This will fail because the question is missing.',
    };

    try {
      const faq = new FAQ(faqData);
      await faq.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.question).to.exist;
    }
  });
});
