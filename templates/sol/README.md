## SOL template guide

1. Install the dependencies:

```bash
pnpm add @solana/spl-token@0.4.x @solana/wallet-adapter-base@0.9.x @solana/wallet-adapter-react@0.15.x @solana/wallet-adapter-wallets@0.19.x @coral-xyz/anchor@0.29.0 bs58 nanoid
```

2. Copy the `config/sol.ts` file to your `config/` folder.
3. Copy the `hooks/` folder to your `hooks/` folder and rename to `sol/`(your hooks folder may look like this: `hooks/sol/`).
4. Copy the `utils/sol.ts` to your `utils/` folder.

Finally, you can verify if the initialization was successful by this case:

```tsx
import { web3 } from '@coral-xyz/anchor'

import { useSolBalance } from '@/hooks/sol/use-balance'

export const Example = () => {
  const { balance } = useSolBalance(
    new web3.PublicKey('So11111111111111111111111111111111111111112')
  )

  console.log('balance', balance) // Should be successed

  return <>...</>
}
```
