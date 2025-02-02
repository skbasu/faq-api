import FAQ from '../models/faqModel.js';
import { redisClient } from '../config/database.js';
import translateText from '../utils/translateText.js';

export const getFAQs = async (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const cacheKey = `faqs:${lang}`;

        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            //console.log('Cache hit');
            return res.json(JSON.parse(cachedData));
        }

        //console.log('Cache miss');
        const projection = lang === 'en'
            ? { question: 1, answer: 1 }
            : { question: `$${`question_${lang}`}`, answer: `$${`answer_${lang}`}` };

        const faqs = await FAQ.find({}, projection);

        await redisClient.setEx(cacheKey, 3600, JSON.stringify(faqs));

        res.json(faqs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch FAQs', details: err.message });
    }
};

export const createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ error: 'Question and Answer are required' });
        }

        const [question_hi, answer_hi, question_bn, answer_bn] = await Promise.all([
            translateText(question, 'hi'),
            translateText(answer, 'hi'),
            translateText(question, 'bn'),
            translateText(answer, 'bn'),
        ]);

        const newFAQ = new FAQ({ question, answer, question_hi, answer_hi, question_bn, answer_bn });
        await newFAQ.save();

        await redisClient.keys('faqs:*').then(async (keys) => {
            if (keys.length > 0) await redisClient.del(keys);
        });

        res.status(201).json({ message: 'FAQ created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create FAQ', details: err.message });
    }
};