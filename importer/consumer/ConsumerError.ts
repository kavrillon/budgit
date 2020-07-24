class ConsumerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConsumerError';
  }
}

export default ConsumerError;
