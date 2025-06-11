// index.js (in project root)
import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context(
    process.env.EXPO_ROUTER_APP_ROOT,
    true,
    /^(?:\.\/)(?!(?:(?:(?:.*\+api)|(?:\+html)))\.[tj]sx?$).*\.[tj]sx?$/
  );
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);