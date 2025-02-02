import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    question_hi: String,
    answer_hi: String,
    question_bn: String,
    answer_bn: String
});

const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;