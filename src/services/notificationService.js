class NotificationService {
  constructor() {
    this.subscribers = new Map();
  }

  subscribe(walletAddress, callback) {
    if (!this.subscribers.has(walletAddress)) {
      this.subscribers.set(walletAddress, new Set());
    }
    this.subscribers.get(walletAddress).add(callback);
  }

  unsubscribe(walletAddress, callback) {
    if (this.subscribers.has(walletAddress)) {
      this.subscribers.get(walletAddress).delete(callback);
    }
  }

  notify(walletAddress, transaction) {
    if (this.subscribers.has(walletAddress)) {
      this.subscribers.get(walletAddress).forEach(callback => {
        callback({
          walletAddress,
          transaction,
          timestamp: new Date().toISOString()
        });
      });
    }
  }
}

export default new NotificationService(); 