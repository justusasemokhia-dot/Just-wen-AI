import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  try {
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
    return null;
  }
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// AI Website Generation
app.post('/api/ai/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt string is required' });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({
      useFallback: true,
      message: 'Gemini client not configured. Using high-fidelity semantic synthesis engine.',
    });
  }

  try {
    const systemPrompt = `You are Just Wen AI, an elite AI website architect and creative designer.
Given a user's natural language request, generate a structured JSON specification for a complete modern website.
Output ONLY valid JSON without markdown fences.
JSON Schema:
{
  "name": "Brand Name",
  "category": "Restaurant|Technology|Business|Portfolio|Agency|E-commerce|Education|Finance|Blog",
  "theme": {
    "primaryColor": "#hex",
    "secondaryColor": "#hex",
    "accentColor": "#hex",
    "backgroundColor": "#hex",
    "cardBackground": "#hex",
    "textColor": "#hex",
    "headingColor": "#hex",
    "fontFamily": "sans|serif",
    "borderRadius": "md|lg|full",
    "mode": "dark|light"
  },
  "header": {
    "logoText": "Brand",
    "tagline": "Short tagline",
    "links": [{"id": "1", "label": "Label", "href": "#section"}],
    "ctaText": "CTA",
    "ctaHref": "#contact"
  },
  "sections": [
    {
      "id": "s1",
      "type": "hero",
      "badge": "Short badge",
      "title": "Inspiring headline",
      "subtitle": "Clear value proposition",
      "imageUrl": "https://images.unsplash.com/photo-...",
      "align": "left|center",
      "primaryCta": {"label": "Get Started", "href": "#contact"},
      "secondaryCta": {"label": "Learn More", "href": "#features"}
    },
    {
      "id": "s2",
      "type": "features|menu|stats|testimonials|pricing|gallery|contact",
      "badge": "Section Badge",
      "title": "Section Title",
      "subtitle": "Section Subtitle",
      "items": [
        {
          "id": "i1",
          "title": "Item Title",
          "description": "Item Description",
          "badge": "Tag",
          "price": "$29"
        }
      ]
    }
  ],
  "footer": {
    "copyright": "© 2026 Brand Name",
    "description": "Brand summary",
    "columns": [{"title": "Explore", "links": [{"id": "f1", "label": "Home", "href": "#"}]}],
    "socialLinks": [{"platform": "Twitter", "url": "#"}, {"platform": "LinkedIn", "url": "#"}]
  },
  "seo": {
    "title": "Page Title",
    "description": "Meta description",
    "keywords": ["keyword1", "keyword2"],
    "favicon": "🌐"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '';
    const parsedData = JSON.parse(text);
    return res.json({ website: parsedData, success: true });
  } catch (error: any) {
    console.warn('Gemini generation error, falling back to local synthesizer:', error?.message);
    return res.json({
      useFallback: true,
      error: error?.message,
    });
  }
});

// AI Website Editing
app.post('/api/ai/edit', async (req, res) => {
  const { currentWebsite, instruction } = req.body;
  if (!instruction || !currentWebsite) {
    return res.status(400).json({ error: 'currentWebsite and instruction are required' });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({
      useFallback: true,
      message: 'Gemini client not configured. Using local instruction rule processor.',
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Current website JSON: ${JSON.stringify(currentWebsite)}.
User instruction: "${instruction}".
Modify the website JSON strictly following the instruction. Return ONLY valid JSON matching the website structure.`,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '';
    const updated = JSON.parse(text);
    return res.json({
      updatedWebsite: updated,
      explanation: `AI successfully applied: "${instruction}"`,
      success: true,
    });
  } catch (err: any) {
    console.warn('Gemini edit error, using fallback:', err?.message);
    return res.json({ useFallback: true, error: err?.message });
  }
});

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Just Wen AI server active on http://0.0.0.0:${PORT}`);
  });
}

start().catch(console.error);
