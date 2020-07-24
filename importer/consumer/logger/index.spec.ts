import ConsumerLogger from './index';
import { MOCK_CONNECTOR_RESULT } from '../../__fixtures__/accounts';

// eslint-disable-next-line
declare let global: any;
let consumer: ConsumerLogger;

describe('ConsumerLogger', () => {
  beforeAll(() => {
    global.console = { log: jest.fn() };
  });

  beforeEach(async () => {
    jest.spyOn(console, 'log');
    consumer = new ConsumerLogger();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('init', () => {
    it('should work', async () => {
      await expect(consumer.init()).resolves.toBe(undefined);
    });
  });

  describe('execute', () => {
    it('should log all given messages', () => {
      consumer.execute({
        messages: ['any message 1', 'any message 2'],
        accounts: [],
      });
      expect(console.log).toHaveBeenCalledWith('## Notifications');
      expect(console.log).toHaveBeenCalledWith('any message 1');
      expect(console.log).toHaveBeenCalledWith('any message 2');
    });

    it('should log all accounts data', () => {
      consumer.execute(MOCK_CONNECTOR_RESULT);
      expect(console.log).toHaveBeenCalledWith('## Imported accounts');
      expect(console.log).toHaveBeenCalledWith(
        '- BK_1/ACC_1 --- 20/02/2020 --- 250 €',
      );
      expect(console.log).toHaveBeenCalledWith(
        '- BK_2/ACC_2 --- 14/02/2020 --- 1202.23 €',
      );
    });
  });
});
