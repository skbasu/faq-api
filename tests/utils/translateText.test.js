import { expect } from 'chai';
import translateText from '../../utils/translateText.js';


describe('Translate Text Utility', () => {
  it('should translate text to Hindi', async () => {
    const inputText = 'Hello';
    const language = 'hi';

    const result = await translateText(inputText, language);
    expect(result).to.be.a('string');
    expect(result).to.equal('नमस्ते'); // Update based on your logic
  });

  it('should return an error for unsupported languages', async () => {
    const inputText = 'Hello';
    const language = 'unsupported';

    try {
      await translateText(inputText, language);
    } catch (error) {
      expect(error).to.exist;
      expect(error.message).to.equal('Unsupported language');
    }
  });
});
