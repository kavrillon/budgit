class ConnectorCsvBpceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConnectorCsvBpceError';
  }
}

export default ConnectorCsvBpceError;
