export async function logEvent(
  event: string,
  payload: Record<string, unknown> = {}
): Promise<void> {
  try {
    const storage = typeof window !== "undefined" ? window.localStorage : null;
    const sessionStorage = typeof window !== "undefined" ? window.sessionStorage : null;
    let visitorId = storage?.getItem("saimor_visitor_id") || "";
    let sessionId = sessionStorage?.getItem("saimor_session_id") || "";

    if (storage && !visitorId) {
      visitorId = crypto.randomUUID();
      storage.setItem("saimor_visitor_id", visitorId);
    }

    if (sessionStorage && !sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("saimor_session_id", sessionId);
    }

    await fetch("/api/log-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        payload,
        path: typeof window !== "undefined" ? window.location.pathname : undefined,
        sessionId,
        visitorId,
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("logEvent failed", error);
    }
  }
}
