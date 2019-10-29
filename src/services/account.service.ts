import jsonAccounts from "../../data/json/accounts.json";
import { Account } from "@/@types/index.js";

export async function getAccounts(): Promise<Account[]> {
  let accounts: Account[] = [];

  jsonAccounts.forEach((account: Account) => {
    accounts.push(account);
  });

  return Promise.resolve(accounts);
}

export async function getAccount(number: number): Promise<Account | null> {
  const account: Account | undefined = jsonAccounts.find(
    (account: Account) => account.number === number
  );
  if (typeof account !== "undefined") {
    return Promise.resolve(account);
  }
  return Promise.resolve(null);
}
