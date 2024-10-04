## EVM template guide

1. Install the dependencies:

```bash
pnpm add wagmi@2.x viem@2.x @rainbow-me/rainbowkit@2.x
```

2. Copy the `components/app.tsx` content to your App Router's `app/layout.tsx` or Pages Router's `_app.tsx`.
3. Copy the `components/providers/app.tsx` to instead your `components/providers/providers.tsx`.
4. Copy the `config/wagmi.ts` file to your `config/` folder.
5. Copy the `constants/contract.ts` file to your `constants` folder.
6. Copy the `contract/` folder to your project.
7. Copy the `hooks/` folder to your `hooks/` folder and rename to `contract/`(your hooks folder may look like this: `hooks/contract/`).

Finally, you can verify if the initialization was successful by this case:

```tsx
import { ConnectButton } from 'rainbow-me/rainbowkit'

export const Example = () => {
  // Should be successed
  return <ConnectButton />
}
```
