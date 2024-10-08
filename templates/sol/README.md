This contains all content related to SOL.

## Getting Started

1. Install the dependencies:

```bash
pnpm add @solana/spl-token@0.4.x @solana/wallet-adapter-base@0.9.x @solana/wallet-adapter-react@0.15.x @solana/wallet-adapter-wallets@0.19.x @coral-xyz/anchor@0.29.0 bs58 nanoid
```

2. Copy `components/sol.tsx` to your `components/providers/` and update your `AppProviders.tsx`.

```tsx
import { SolProvider } from '@/components/providers/sol'

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <I18nextProvider i18n={i18nConfig}>
      <QueryClientProvider client={queryClient}>
        {/* Must be within `QueryClientProvider` */}
        <SolProvider>{children}</SolProvider>
      </QueryClientProvider>
    </I18nextProvider>
  )
}
```

3. Copy `config/sol.ts` to your `config/` .
4. Copy `hooks/` to your `hooks/` and rename to `sol/`(your hooks folder may look like this: `hooks/sol/`).
5. Copy `utils/sol.ts` to your `utils/`.

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
