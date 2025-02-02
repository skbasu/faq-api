import { translate } from '@vitalets/google-translate-api';

// Translation Helper
const translateText = async (text, lang) => {
    try {
        const result = await translate(text, { to: lang });
        return result.text;
    } catch (err) {
        console.error(`Translation failed: ${err.message}`);
        return null;
    }
};

export default translateText;