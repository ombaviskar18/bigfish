class TelegramService {
  constructor() {
    // Use environment variables with fallback values
    this.BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN || '8156859518:AAE3YTDUmG6f-0kJOA_96QDaI5Rb0YGTotE';
    this.CHAT_ID = process.env.REACT_APP_TELEGRAM_CHAT_ID || '@pioneers1234';
    
    // Validate configuration
    if (!this.BOT_TOKEN || !this.CHAT_ID) {
      console.error('Telegram configuration missing!');
    }
  }

  async sendMessage(message) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send Telegram message');
      }

      return await response.json();
    } catch (error) {
      console.error('Telegram notification error:', error);
      throw error;
    }
  }

  async sendWhaleAlert(walletAddress, volume, nftsBought, nftsSold) {
    if (!walletAddress || !volume) {
      throw new Error('Wallet address and volume are required');
    }

    try {
      const message = `
🚨 NFT Whale Alert! 🐋

👛 Wallet: ${walletAddress}
💰 Volume: ${Number(volume).toFixed(2)} ETH
🛍️ NFTs Bought: ${nftsBought || 0}
💎 NFTs Sold: ${nftsSold || 0}

🔍 View on OpenSea: https://opensea.io/${walletAddress}`;

      const response = await fetch(
        `https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: this.CHAT_ID,
            text: message
          })
        }
      );

      const data = await response.json();
      console.log('Telegram API response:', data);

      if (!data.ok) {
        throw new Error(data.description || 'Failed to send Telegram alert');
      }

      return data;
    } catch (error) {
      console.error('Telegram notification error:', error);
      throw error;
    }
  }
}

const telegramService = new TelegramService();
export default telegramService;