// Session-based message counting for public users
interface PublicSession {
  id: string;
  messageCount: number;
  createdAt: number;
  lastActivity: number;
  requiresCaptcha: boolean;
}

// In-memory storage for public sessions
const publicSessions = new Map<string, PublicSession>();

// Cleanup sessions older than 1 hour
setInterval(() => {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  Array.from(publicSessions.entries()).forEach(([sessionId, session]) => {
    if (now - session.lastActivity > oneHour) {
      publicSessions.delete(sessionId);
    }
  });
}, 15 * 60 * 1000); // Check every 15 minutes

export class SessionStore {
  static getPublicSession(sessionId: string): PublicSession {
    let session = publicSessions.get(sessionId);

    if (!session) {
      session = {
        id: sessionId,
        messageCount: 0,
        createdAt: Date.now(),
        lastActivity: Date.now(),
        requiresCaptcha: false
      };
      publicSessions.set(sessionId, session);
    }

    return session;
  }

  static updatePublicSession(sessionId: string, updates: Partial<PublicSession>): PublicSession {
    const session = this.getPublicSession(sessionId);

    Object.assign(session, updates, {
      lastActivity: Date.now()
    });

    publicSessions.set(sessionId, session);
    return session;
  }

  static incrementMessageCount(sessionId: string): PublicSession {
    const session = this.getPublicSession(sessionId);
    session.messageCount++;
    session.lastActivity = Date.now();

    // Require captcha after 2 messages
    if (session.messageCount >= 3) {
      session.requiresCaptcha = true;
    }

    publicSessions.set(sessionId, session);
    return session;
  }

  static checkMessageLimit(sessionId: string): { allowed: boolean; remaining: number; requiresCaptcha: boolean } {
    const session = this.getPublicSession(sessionId);
    const limit = 5;
    const remaining = Math.max(0, limit - session.messageCount);

    return {
      allowed: session.messageCount < limit,
      remaining,
      requiresCaptcha: session.requiresCaptcha
    };
  }

  static resetCaptchaRequirement(sessionId: string): void {
    const session = this.getPublicSession(sessionId);
    session.requiresCaptcha = false;
    publicSessions.set(sessionId, session);
  }
}