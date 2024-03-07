let's create the github actions workflow to run the prod deployment.

```yaml
name: Deploy Production App
on:
  pull_request:
    types: [ closed ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      API_KEY: ${{ secrets.NEON_API_KEY }}
      STAGE: dev
      GH_TOKEN: ${{ github.token }} # github cli -> gh
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20.11"
          cache: 'npm'
      - name: Install dependencies
        run: npm install
      - name: Deploy to AWS
        run: npm run deploy
```
