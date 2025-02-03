

# BigFish: NFT Whale Tracker 🐋

Real-time NFT analytics platform that tracks whale movements, provides AI-powered insights, and sends live Telegram alerts to help traders make smarter investment decisions.

## Features 🚀

### 1. Whale Identification
- Track high-value NFT wallets
- Real-time transaction monitoring
- Portfolio analysis
- AI-powered behavioral insights

### 2. Movement Alerts
- Instant Telegram notifications
- Customizable alert thresholds
- Multi-blockchain support
- Transaction pattern detection

### 3. Market Analytics
- Real-time market trends
- Volume analysis
- Price impact visualization
- Wash trading detection

### 4. AI Analysis
- Predictive analytics
- Risk assessment
- Market sentiment analysis
- Trading pattern recognition

## Tech Stack 💻

- **Frontend**: Next.js, Material-UI, Chart.js, Framer Motion
- **AI/ML**: Google Generative AI (Gemini Pro)
- **Integration**: Telegram Bot API
- **Data**: UnleashNFTs API
- **Styling**: Tailwind CSS, Radix UI

## Getting Started 🏁

### Prerequisites
```bash
# Required
Node.js >= 14.0.0
npm >= 6.14.0
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/Sarthaknimje/bigfish.git
cd bigfish
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
# Copy example env file
cp .env.example .env

# Add your variables to .env
NEXT_PUBLIC_API_PROXY=your_api_proxy
REACT_APP_TELEGRAM_BOT_TOKEN=your_bot_token
REACT_APP_TELEGRAM_CHAT_ID=your_chat_id
```

4. Run development server
```bash
npm run dev
# or
yarn dev
```

5. Build for production
```bash
npm run build
# or
yarn build
```

6. Start production server
```bash
npm start
# or
yarn start
```

### Docker Support
```bash
# Build Docker image
docker build -t bigfish .

# Run Docker container
docker run -p 3000:3000 bigfish
```

## Contributing 🤝

1. Fork the repository
```bash
# Create a fork via GitHub UI, then:
git clone https://github.com/your-username/bigfish.git
```

2. Create your feature branch
```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes
```bash
git commit -m 'Add some AmazingFeature'
```

4. Push to the branch
```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request via GitHub UI

## Troubleshooting 🔧

If you encounter CORS issues:
```bash
# Add proxy to package.json
"proxy": "https://api.unleashnfts.com"
```

For Telegram bot issues:
```bash
# Test bot connection
curl -X POST "https://api.telegram.org/bot${YOUR_BOT_TOKEN}/getMe"
```

## License 📝

This project is licensed under the MIT License.

## Contact 📧

- GitHub: [@Sarthaknimje](https://github.com/Sarthaknimje)
- Project Link: [https://github.com/Sarthaknimje/bigfish](https://github.com/Sarthaknimje/bigfish)


Give a ⭐️ if this project helped you track NFT whales better!
Hare Krishna!
