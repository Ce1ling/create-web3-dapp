## EVM template guide

1. Install the dependencies:

```bash
pnpm add wagmi@2.x viem@2.x @rainbow-me/rainbowkit@2.x
```

2. Copy `import '@rainbow-me/rainbowkit/styles.css'` to your app component.
3. Copy `config/wagmi.ts` to your `config/`.
4. Copy `components/evm.tsx` to your `components/providers/` and update your `AppProviders`:

```tsx
import { EvmProvider } from '@/components/providers/evm'

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <I18nextProvider i18n={i18nConfig}>
      <QueryClientProvider client={queryClient}>
        {/* Must be within QueryClientProvider */}
        <EvmProvider>{children}</EvmProvider>
      </QueryClientProvider>
    </I18nextProvider>
  )
}
```

5. Copy `constants/contract.ts` to your `constants/`.
6. Copy `contract/` folder to your project.
7. Copy `hooks/` folder to your `hooks/` folder and rename to `contract/`(your hooks folder may look like this: `hooks/contract/`).

Finally, you can verify if the initialization was successful by this case:

```tsx
import { ConnectButton } from 'rainbow-me/rainbowkit'

export const Example = () => {
  // Should be successed
  return <ConnectButton />
}
```
