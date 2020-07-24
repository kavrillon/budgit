class ImporterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImporterError';
  }
}

export default ImporterError;
