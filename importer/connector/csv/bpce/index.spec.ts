// eslint-disable-next-line
const fs = require('fs');
import { Account } from '@types';
import { parseBpceCsv } from '.';

const csvFileContent = fs.readFileSync(
  './importer/connector/csv/bpce/__fixtures__/success/file1.csv',
  'utf8',
);

describe('importer/connector/csv/bpce', () => {
  let result: Account;

  describe('parseBpceCsv', () => {
    describe('when the csv is not valid', () => {
      describe('when the date is not valid', () => {
        it('should throw an error', () => {
          const errorContent = fs.readFileSync(
            './importer/connector/csv/bpce/__fixtures__/error/error_date.csv',
            'utf8',
          );
          expect(() => parseBpceCsv(errorContent)).toThrowError('Invalid date');
        });
      });

      describe('when there is no info', () => {
        it('should throw an error', () => {
          const errorContent = fs.readFileSync(
            './importer/connector/csv/bpce/__fixtures__/error/error_empty.csv',
            'utf8',
          );
          expect(() => parseBpceCsv(errorContent)).toThrowError(
            'CSV is not valid',
          );
        });
      });

      describe('when the id is empty', () => {
        it('should throw an error', () => {
          const errorContent = fs.readFileSync(
            './importer/connector/csv/bpce/__fixtures__/error/error_noid.csv',
            'utf8',
          );
          expect(() => parseBpceCsv(errorContent)).toThrowError(
            'CSV is not valid',
          );
        });
      });

      describe('when the total is empty', () => {
        it('should throw an error', () => {
          const errorContent = fs.readFileSync(
            './importer/connector/csv/bpce/__fixtures__/error/error_nototal.csv',
            'utf8',
          );
          expect(() => parseBpceCsv(errorContent)).toThrowError(
            'Total is not valid',
          );
        });
      });
    });

    describe('when the csv is valid', () => {
      beforeEach(() => {
        result = parseBpceCsv(csvFileContent);
      });

      it('should return the account id', () => {
        expect(result.id).toBe('ACC_1');
      });

      it('should return the account total', () => {
        expect(result.total).toBe(1134.12);
      });

      it('should return the account last update date', () => {
        const date = new Date(2020, 1, 12);
        date.setHours(0, 0, 0);
        expect(result.lastUpdate).toStrictEqual(date);
      });
    });
  });
});
