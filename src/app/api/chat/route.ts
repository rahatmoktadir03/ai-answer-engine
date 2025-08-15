// AI Answer Engine API Route
// Implements chat API with Groq and web scraping with Cheerio and Puppeteer
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { Groq } from "groq-sdk";

interface ScrapedContent {
  url: string;
  title: string;
  content: string;
  error?: string;
}

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
    const scrapedData: ScrapedContent[] = [];
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    for (const url of urls) {
      try {
        const page = await browser.newPage();

        // Set user agent to avoid blocking
        await page.setUserAgent(
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        );

        // Navigate with timeout
        await page.goto(url, {
          waitUntil: "networkidle0",
          timeout: 30000,
        });

        const htmlContent = await page.content();
        const $ = cheerio.load(htmlContent);

        // Extract title
        const title = $("title").text() || $("h1").first().text() || "Untitled";

        // Extract main content - prioritize semantic elements
        const contentSelectors = [
          "article",
          "main",
          ".content",
          ".post-content",
          ".entry-content",
          "p",
        ];

        let content = "";
        for (const selector of contentSelectors) {
          const elements = $(selector);
          if (elements.length > 0) {
            content = elements
              .map((_, el) => $(el).text())
              .get()
              .join(" ")
              .replace(/\s+/g, " ")
              .trim();
            if (content.length > 100) break;
          }
        }

        // Fallback to all text if no content found
        if (!content) {
          content = $("body").text().replace(/\s+/g, " ").trim();
        }

        scrapedData.push({
          url,
          title,
          content: content.substring(0, 5000), // Limit content length
        });

        await page.close();
      } catch (error) {
        console.error(`Error scraping ${url}:`, error);
        scrapedData.push({
          url,
          title: "Error",
          content: "",
          error: `Failed to scrape: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }

    await browser.close();

    // Prepare context for the AI
    const context = scrapedData
      .filter(data => !data.error && data.content)
      .map(
        data => `Source: ${data.title} (${data.url})\nContent: ${data.content}`
      )
      .join("\n\n");

    if (!context) {
      return new Response(
        JSON.stringify({
          error:
            "Unable to extract content from the provided URLs. Please check if the URLs are accessible and contain readable content.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Initialize the Groq client
    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Create a comprehensive prompt
    const prompt = `You are an AI research assistant. Based on the following sources, provide a comprehensive and accurate answer to the user's question. Always cite your sources and be transparent about the information you're using.

Sources:
${context}

Question: ${question}

Instructions:
1. Provide a detailed, well-structured answer based on the source material
2. Include specific citations to the sources (mention the source URL or title)
3. If the sources don't contain enough information to fully answer the question, clearly state this
4. Highlight any contradictions or different perspectives found in the sources
5. Be objective and factual in your response
6. Format your response clearly with proper paragraphs

Answer:`;

    // Use the chat API
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI research assistant that provides accurate, well-cited answers based on provided sources. Always be transparent about your sources and limitations.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.1, // Lower temperature for more factual responses
      max_tokens: 2048,
    });

    // Return the AI response with metadata
    return new Response(
      JSON.stringify({
        answer: chatCompletion.choices,
        sources: scrapedData.map(data => ({
          url: data.url,
          title: data.title,
          hasContent: !!data.content,
          error: data.error,
        })),
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(
      JSON.stringify({
        error:
          "An error occurred while processing your request. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
