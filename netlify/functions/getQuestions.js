const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async function () {
  try {
    const prompt = `
      Create a multiple-choice question about DevOps or Cloud Computing.
      Format response as JSON:
      {
        "question": "...",
        "choices": ["...", "...", "...", "..."],
        "answer": "..."
      }
    `;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const response = completion.data.choices[0].message.content;
    const json = JSON.parse(response);
    return {
      statusCode: 200,
      body: JSON.stringify(json),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
