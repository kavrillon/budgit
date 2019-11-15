# Budg'It

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/acb3ea28c14e45b18a1e79f6e5584077)](https://www.codacy.com/manual/kavrillon/budgit?utm_source=github.com&utm_medium=referral&utm_content=kavrillon/budgit&utm_campaign=Badge_Grade)

## Project setup

Be aware: for now, the project works only with the CE bank export.

- `yarn install`
- Create a `BUDGIT_DATA_PATH` env var containing the absolute path to the bank account export files (.csv).
- `yarn data:import`
- `yarn serve`
