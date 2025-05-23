const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const response = completion.choices[0].message.content;
    const json = JSON.parse(response);
    return {
      statusCode: 200,
      body: JSON.stringify(json),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
