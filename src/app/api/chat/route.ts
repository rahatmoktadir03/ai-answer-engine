// TODO: Implement the chat API with Groq and web scraping with Cheerio and Puppeteer
// Refer to the Next.js Docs on how to read the Request body: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
// Refer to the Groq SDK here on how to use an LLM: https://www.npmjs.com/package/groq-sdk
// Refer to the Cheerio docs here on how to parse HTML: https://cheerio.js.org/docs/basics/loading
// Refer to Puppeteer docs here: https://pptr.dev/guides/what-is-puppeteer
import puppeteer from "puppeteer";
import * as cheerio from 'cheerio';
import { Groq } from "groq-sdk";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { question, urls } = await req.json();

    if (!question || !urls || urls.length === 0) {
      return new Response(
        JSON.stringify({ error: "Question and URLs are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Scrape data from the provided URLs
    const scrapedData: string[] = [];
    const browser = await puppeteer.launch();
    for (const url of urls) {
      const page = await browser.newPage();
      await page.goto(url);

      const htmlContent = await page.content();
      const $ = cheerio.load(htmlContent);

      const pageText = $("p")
        .map((_, el) => $(el).text())
        .get()
        .join(" ");
      scrapedData.push(pageText);
    }
    await browser.close();

    // Initialize the Groq client
    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Use the chat API
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: 'user', content: question }],
      model: 'llama3-8b-8192',
    });
    console.log(chatCompletion.choices[0].message.content);

    // Return the AI response
    return new Response(
      JSON.stringify({ answer: chatCompletion.choices }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}