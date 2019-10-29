import jsonAccounts from "../../data/json/accounts.json";
import { Account } from "@/@types/index.js";

export async function getAccounts(): Promise<Account[]> {
  let accounts: Account[] = [];

  jsonAccounts.forEach((jsonObject: any) => {
    accounts.push(jsonToAccount(jsonObject));
  });

  return Promise.resolve(accounts);
}

export async function getAccount(number: number): Promise<Account | null> {
  const account: Object | undefined = jsonAccounts.find(
    (jsonObject: any) => jsonObject.number === number
  );
  if (typeof account !== "undefined") {
    return Promise.resolve(jsonToAccount(account));
  }
  return Promise.resolve(null);
}

function jsonToAccount(jsonObject: any) {
  const account: Account = {
    bank: jsonObject.bank,
    lastUpdate: new Date(jsonObject.lastUpdate),
    number: jsonObject.number,
    name: jsonObject.name,
    balance: jsonObject.balance,
    operations: jsonObject.operations.map((op: any) => ({
      number: op.number,
      date: new Date(op.date),
      name: op.name,
      infos: op.infos,
      value: op.value
    }))
  };

  return account;
}
