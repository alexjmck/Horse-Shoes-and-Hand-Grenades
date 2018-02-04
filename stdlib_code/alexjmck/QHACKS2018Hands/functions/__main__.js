const clarifai = require("clarifai")

const app = new Clarifai.App({
 apiKey: process.env.CLARIFAI_API_KEY
});
/**
* A basic Hello World function
* @returns {object}
*/
module.exports = async (context) => {
	let result = await app.models.predict(process.env.CLARIFAI_MODEL_ID, context.params.picture);
  return result;
};
