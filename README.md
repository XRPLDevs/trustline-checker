# Trustline Checker

A web application for checking XRPL (XRP Ledger) trustlines. Connect your wallet and view account information and trustline details.

## Features

- **Wallet Connection**: Support for XAMAN, GemWallet, and Crossmark
- **Multi-Network**: Mainnet, Testnet, Devnet, Xahau Mainnet/Testnet
- **Account Info**: Display connected account details
- **Trustline Check**: View account trustlines and details
- **Internationalization**: Japanese and English support

## Tech Stack

- **Frontend**: Next.js 15, HeroUI v2, Tailwind CSS, TypeScript
- **State Management**: Zustand, TanStack Query
- **XRPL**: xrpl.js, XUMM SDK

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/XRPLDevs/trustline-checker.git
cd trustline-checker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run format   # Format code with Biome
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

## Links

- [GitHub Repository](https://github.com/XRPLDevs/trustline-checker)
- [XRPL Documentation](https://xrpl.org/docs/)
- [HeroUI Documentation](https://heroui.com/)

---

**Trustline Checker** - Your trustline, now a health check.
