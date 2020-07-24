import Importer from './importer';
import ImporterError from './ImporterError';
import { Connector } from './connector';
import { Consumer } from './consumer';
import {
  MOCK_CONNECTOR_RES_1,
  MOCK_CONNECTOR_RES_2,
  MOCK_CONNECTOR_MERGED,
} from './__fixtures__/accounts';

let importer: Importer;
const connectorStubSync = {
  execute: jest.fn().mockReturnValue(MOCK_CONNECTOR_RES_1),
  init: jest.fn(),
} as Connector;

const connectorStubAsyncSuccess = {
  execute: jest.fn().mockResolvedValue(MOCK_CONNECTOR_RES_2),
  init: jest.fn(),
} as Connector;

const connectorStubAsyncError = {
  execute: jest.fn(),
  init: jest.fn().mockRejectedValue(new Error('any error')),
} as Connector;

const consumerStub = {
  execute: jest.fn(() => ({ status: true, message: null })),
  init: jest.fn(),
} as Consumer;

const consumerStubError = {
  execute: jest.fn(() => ({ status: true, message: null })),
  init: jest.fn().mockRejectedValue(new Error('any error')),
} as Consumer;

describe('Importer', () => {
  describe('init', () => {
    beforeEach(() => {
      jest.spyOn(connectorStubSync, 'init');
      jest.spyOn(connectorStubAsyncSuccess, 'init');
      jest.spyOn(connectorStubAsyncError, 'init');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should init all connectors', () => {
      importer = new Importer([connectorStubSync, connectorStubAsyncSuccess]);
      importer.init();

      expect(connectorStubSync.init).toHaveBeenCalledTimes(1);
      expect(connectorStubAsyncSuccess.init).toHaveBeenCalledTimes(1);
    });

    it('should init all consumers', () => {
      importer = new Importer([], [consumerStub, consumerStub]);
      importer.init();

      expect(consumerStub.init).toHaveBeenCalledTimes(2);
    });

    it('should resolve if all connectors are initialized', async () => {
      importer = new Importer([connectorStubSync, connectorStubAsyncSuccess]);
      jest.spyOn(importer, 'init');

      await expect(importer.init()).resolves.toBe(undefined);
    });

    it('should resolve if all consumers are initialized', async () => {
      importer = new Importer([], [consumerStub, consumerStub]);
      jest.spyOn(importer, 'init');

      await expect(importer.init()).resolves.toBe(undefined);
    });

    it('should reject if a connector fails to initialize', async () => {
      importer = new Importer([connectorStubSync, connectorStubAsyncError]);
      jest.spyOn(importer, 'init');

      await expect(importer.init()).rejects.toThrow(
        new ImporterError('Error: any error'),
      );
    });

    it('should reject if a connector fails to initialize', async () => {
      importer = new Importer([], [consumerStub, consumerStubError]);
      jest.spyOn(importer, 'init');

      await expect(importer.init()).rejects.toThrow(
        new ImporterError('Error: any error'),
      );
    });
  });

  describe('execute', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.spyOn(connectorStubSync, 'execute');
      jest.spyOn(connectorStubAsyncSuccess, 'execute');
      jest.spyOn(connectorStubAsyncError, 'execute');
      jest.spyOn(consumerStub, 'execute');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should execute all given connectors', async () => {
      importer = new Importer([connectorStubSync, connectorStubAsyncSuccess]);
      await importer.execute();

      expect(connectorStubSync.execute).toHaveBeenCalledTimes(1);
      expect(connectorStubAsyncSuccess.execute).toHaveBeenCalledTimes(1);
    });

    it('should execute all given consumers with aggregated connectors results', async () => {
      importer = new Importer(
        [connectorStubSync, connectorStubAsyncSuccess],
        [consumerStub, consumerStub],
      );
      await importer.execute();

      expect(consumerStub.execute).toHaveBeenCalledTimes(2);
      expect(consumerStub.execute).toHaveBeenCalledWith(MOCK_CONNECTOR_MERGED);
    });
  });
});
