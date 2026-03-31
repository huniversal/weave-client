export default {
  "*.{ts,tsx,js,jsx}": ["pnpm eslint --fix"],
  "*.{ts,tsx,js,jsx,json,md,yml,yaml}": ["pnpm prettier --write"]
};
