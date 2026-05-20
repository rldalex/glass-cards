// Mounts the Agentation widget into a dedicated root div.
// React is loaded dynamically so it stays out of the production bundle.

export async function mountAgentation(): Promise<void> {
  try {
    const [{ createElement }, { createRoot }, agentationMod] = await Promise.all([
      import('react'),
      import('react-dom/client'),
      import('agentation'),
    ]);

    const Agentation = (agentationMod as { Agentation?: unknown }).Agentation;
    if (!Agentation) {
      console.warn('[agentation] export "Agentation" not found in module', agentationMod);
      return;
    }

    const host = document.createElement('div');
    host.id = 'agentation-root';
    document.body.appendChild(host);

    const root = createRoot(host);
    // Default MCP endpoint per agentation docs. Override via VITE_AGENTATION_ENDPOINT env var.
    const endpoint = (import.meta as { env?: { VITE_AGENTATION_ENDPOINT?: string } }).env?.VITE_AGENTATION_ENDPOINT ?? 'http://localhost:4747';
    root.render(createElement(Agentation as React.ComponentType<{ endpoint?: string }>, { endpoint }));
  } catch (err) {
    console.warn('[agentation] failed to mount:', err);
  }
}
