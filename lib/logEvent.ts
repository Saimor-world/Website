export async function logEvent(
  event: string,
  payload: Record<string, unknown> = {}
): Promise<void> {
  try {
    await fetch("/api/log-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        payload,
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("logEvent failed", error);
    }
  }
}
