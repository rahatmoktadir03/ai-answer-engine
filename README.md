# 🔍 Insight

A modern, intelligent answer engine built with Next.js and TypeScript that scrapes web content and provides accurate, source-cited responses. Inspired by Perplexity.ai, this project eliminates hallucinations by grounding AI responses in real web data.

## ✨ Features

- **🌐 Web Content Scraping**: Automatically extracts and analyzes content from multiple websites
- **🧠 AI-Powered Responses**: Uses advanced language models (Groq) for intelligent question answering
- **📚 Source Citations**: Every answer includes properly cited sources for transparency
- **⚡ Lightning Fast**: Optimized processing pipeline with intelligent caching
- **🛡️ Rate Limiting**: Built-in Redis-based rate limiting for API protection
- **📱 Modern UI**: Beautiful, responsive interface with dark mode and animations
- **🔄 Real-time Chat**: Interactive chat interface with message history

## 🚀 Demo

Check out the live example: [https://www.webchat.so/](https://www.webchat.so/)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Groq SDK
- **Web Scraping**: Puppeteer, Cheerio
- **Rate Limiting**: Upstash Redis
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Groq API key ([Get one here](https://console.groq.com/))
- Upstash Redis credentials ([Sign up here](https://upstash.com/))

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rahatmoktadir03/ai-answer-engine.git
cd ai-answer-engine
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in your environment variables in `.env.local`:

```env
GROQ_API_KEY=your_groq_api_key_here
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts     # Chat API endpoint
│   ├── chat/page.tsx         # Chat interface page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles
├── components/
│   ├── chat-interface.tsx    # Chat UI component
│   ├── landing-page.tsx      # Landing page component
│   └── ui.tsx                # Reusable UI components
└── middleware.ts             # Rate limiting middleware
```

## 🔧 Configuration

### Groq API Setup

1. Visit [Groq Console](https://console.groq.com/)
2. Create an account and generate an API key
3. Add the key to your `.env.local` file

### Upstash Redis Setup

1. Visit [Upstash](https://upstash.com/)
2. Create a Redis database
3. Copy the REST URL and Token to your `.env.local` file

## 📝 Usage

### Basic Usage

1. Navigate to the chat interface (`/chat`)
2. Enter one or more URLs (comma-separated)
3. Ask your question
4. Get an AI-generated answer with source citations

### API Usage

Send a POST request to `/api/chat`:

```json
{
  "question": "What are the main benefits of renewable energy?",
  "urls": [
    "https://example.com/renewable-energy",
    "https://another-source.com/clean-energy"
  ]
}
```

## 🌟 Features in Detail

### Web Scraping

- Uses Puppeteer for dynamic content rendering
- Cheerio for efficient HTML parsing
- Handles multiple content formats and structures
- Respects robots.txt and implements proper error handling

### AI Processing

- Integrates with Groq's fast inference API
- Uses Llama 3 8B model for high-quality responses
- Implements context-aware prompting for better accuracy
- Temperature control for consistent, factual outputs

### Rate Limiting

- Redis-based sliding window rate limiting
- Configurable limits per IP address
- Graceful error handling with informative responses
- Headers for rate limit status

## 🔮 Roadmap

### Core Features (Current)

- [x] Basic chat interface
- [x] Web content scraping
- [x] AI-powered responses
- [x] Source citations
- [x] Rate limiting

### Advanced Features (Planned)

- [ ] Conversation sharing and persistence
- [ ] Multiple data source support (PDFs, YouTube, images)
- [ ] Data visualization (charts, graphs)
- [ ] Hierarchical web crawling
- [ ] User authentication and history
- [ ] API key management
- [ ] Webhook integrations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Perplexity.ai](https://perplexity.ai)
- Built with [Next.js](https://nextjs.org/)
- Powered by [Groq](https://groq.com/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check out the [documentation](https://github.com/rahatmoktadir03/ai-answer-engine/wiki)
- Contact the maintainers

---

**Happy coding! 🚀**

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tasks

- Take a look at the TODOs throughout the repo, namely:

  - `src/app/page.tsx`: Update the UI and handle the API response as needed
  - `src/app/api/chat/route.ts`: Implement the chat API with Groq and web scraping with Cheerio and Puppeteer
  - `src/middleware.ts`: Implement the code here to add rate limiting with Redis

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
