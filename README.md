# mifx-test

Run instructions for both the web and mobile apps included in this repository.

**Prerequisites**
- Node.js (16+) and `npm` installed
- For mobile: Expo Go on your device (or an emulator) and `npx` available

**Web (crypto-market)**
- Change into the web folder and install dependencies:

```bash
cd crypto-market
npm install
```

- Start the dev server:

```bash
npm run dev
```

- Open the app in your browser at http://localhost:3000

**Mobile (crypto-market-mobile)**
- Change into the mobile folder and install dependencies:

```bash
cd crypto-market-mobile
npm install
```

- Start Expo Metro bundler:

```bash
npx expo start
```

- Scan the QR code with Expo Go or open the app on an emulator. If scanning hangs, try clearing cache or using the tunnel:

```bash
npx expo start -c
npx expo start --tunnel
```