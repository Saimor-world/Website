# 🤖 Core-Môra System Mapping - Vollständige Backend-Dokumentation

> **Erstellt:** 2025-10-27
> **Zweck:** Übergabe aller relevanten Backend-Logiken, KPIs, APIs und Events an das Frontend-Team

---

## 📊 **1. KPIs - Was das Backend bereitstellt**

### **Echtzeit-Metriken**

| KPI | Einheit | Bedeutung | API Endpoint |
|-----|---------|-----------|--------------|
| **Klarheitsindex** | % | Gesprächsqualität (Verständlichkeit + Zielerreichung) | `/api/dashboard/stats/overview` |
| **Kosten Heute** | USD | API-Kosten für den aktuellen Tag | `/api/dashboard/costs/today` |
| **Kosten Woche** | USD | API-Kosten der letzten 7 Tage | `/api/dashboard/costs/today` |
| **Kosten Monat** | USD | API-Kosten für den aktuellen Monat | `/api/dashboard/costs/today` |
| **Voice Calls Heute** | Anzahl | Anzahl Voice-Anrufe heute | `/api/dashboard/stats/overview` |
| **Memory Facts** | Anzahl | Gespeicherte Fakten im Gedächtnis | `/api/dashboard/stats/overview` |
| **Episodic Memories** | Anzahl | Episodische Erinnerungen (Gespräche) | `/api/dashboard/stats/overview` |
| **Pending Learnings** | Anzahl | Learnings die auf Review warten | `/api/dashboard/stats/overview` |
| **System Health** | Status | `ok` / `warning` / `error` | `/api/dashboard/status` |
| **Response Time** | ms | Durchschnittliche API-Antwortzeit | `/api/dashboard/stats/overview` |
| **Active Sessions** | Anzahl | Aktive Voice/Chat-Sessions | `/api/dashboard/status` |
| **Uptime** | Sekunden | Zeit seit letztem Restart | `/api/dashboard/status` |

### **Update-Frequenz**
- **Real-time:** Health Status, Active Sessions
- **Nach Aktion:** Costs, Voice Calls, Memory Facts
- **Polling (Frontend):** 30 Sekunden Interval

---

## 🗣️ **2. Môra-Ausgaben und Trigger-Logik**

### **Text-Ausgaben**

Môra erzeugt Text-Responses über 3 Kanäle:

| Kanal | Modell | Trigger |
|-------|--------|---------|
| **Voice** (Twilio) | `claude-3-5-sonnet-20241022` | User ruft `+1 815-680-2973` an |
| **Chat** (Website) | `claude-3-5-haiku-20241022` | POST `/mora/chat` |
| **Dashboard Chat** | `claude-3-haiku-20240307` | POST `/api/dashboard/chat/message` |

### **Emotionale Tonalität**

Môra passt ihre Tonalität basierend auf Kontext an:

| Tonalität | Trigger | Beispiel |
|-----------|---------|----------|
| **calm** | Normale Gespräche, Status-Updates | "Alles läuft rund. Deine Costs heute: $2.45" |
| **alert** | Grenzwerte überschritten | "⚠️ Achtung: Costs haben $5/Tag überschritten!" |
| **focused** | Lernsituationen, Review Queue | "Ich habe 3 neue Insights - lass uns die durchgehen." |
| **curious** | High-risk Learning Brain Events | "Soll ich das als Fakt speichern?" |

### **Dashboard-Reaktion**

✅ **Môra kann auf Dashboard-Werte reagieren:**
- "Deine Memory ist voll" (wenn Facts > 1000)
- "Heute schon 10 Calls geführt!" (bei Voice Calls)
- "Pending Learnings: 5 warten auf Review"

---

## 🏆 **3. Achievement-System (Learning Brain)**

### **Status:** Teilweise implementiert (Backend-Logik vorhanden, UI fehlt)

### **Konzept**
Das Learning Brain fungiert als autonomes Lernsystem:
- **Low-Risk Insights:** Auto-Commit (z.B. Ton, Phrasen)
- **High-Risk Insights:** Review Queue (z.B. Preise, Policies)

### **Trigger**

#### **Schlüsselwörter**
| Wort | Action | Risk Level | Beispiel |
|------|--------|-----------|----------|
| "merke dir" | Erstellt Learning Insight | `high` | "Merke dir: Cappuccino" |
| "lerne" | Erstellt Learning Insight | `auto` | "Lerne, dass ich morgens fokussierter bin" |

#### **Events**
| Event | Beschreibung | Achievement Potential |
|-------|--------------|----------------------|
| `voice_call_complete` | Nach jedem Voice Call wird Summary gespeichert | ✅ |
| `learning_approved` | Admin approved Learning aus Queue | ✅ |
| `memory_milestone` | 100, 500, 1000 Facts erreicht | ✅ |

### **Vordefinierte Achievements (noch nicht implementiert)**

| ID | Name | Trigger |
|----|------|---------|
| `first_learning` | Erste Lektion | Erstes approved Learning |
| `memory_master_100` | Memory Master | 100 Facts im Gedächtnis |
| `conversation_veteran` | Gesprächsprofi | 50 Voice Calls |
| `cost_conscious` | Sparsam | < $3/Tag für 7 Tage |

### **Môra-Reaktion auf Achievements**

💡 **Empfehlung:** Wenn Achievement erreicht, Môra zeigt Toast:
```
🎉 Glückwunsch! Du hast 100 Facts im Gedächtnis erreicht!
```

---

## 👤 **4. Nutzer-Modi und Session-Management**

### **Dashboard**
- **Auth:** Token-basiert (Bearer Token)
- **Token-Speicher:** `localStorage` (Frontend)
- **Session-Tracking:** Nein (stateless)
- **Fortschritt-Speicher:** Nein

### **Website Chat**
- **Auth:** Public (rate-limited: 10 req/min, 15 API calls/session)
- **Session-Tracking:** Ja (In-Memory)
- **Session-TTL:** 30 Minuten
- **Fortschritt-Speicher:** Temporär (nur während Session)
- **Besonderheit:** FAQ-System für kostenfreie Antworten

### **Voice**
- **Auth:** Twilio Call ID
- **Session-Tracking:** Ja (Database via `call_sid`)
- **Fortschritt-Speicher:** Permanent (episodic memory + usage logs)

---

## 🔌 **5. API-Schnittstellen - Vollständige Endpunkte**

### **Base URLs**
```
Dashboard API:  https://voice.saimor.world/api/dashboard
Chat API:       https://voice.saimor.world/mora
Gateway API:    http://localhost:8080/api/v1
```

### **Wichtigste Endpunkte**

#### **System Status**
```http
GET /api/dashboard/status
Authorization: Bearer {token}

Response:
{
  "status": "online | offline | degraded",
  "health": "ok | warning | error",
  "last_activity": "2025-10-27T15:30:00Z",
  "uptime_seconds": 86400,
  "services": {
    "voice": "online",
    "chat": "online",
    "database": "ok",
    "redis": "ok"
  }
}
```

#### **Kosten**
```http
GET /api/dashboard/costs/today
Authorization: Bearer {token}

Response:
{
  "today": 2.45,
  "week": 15.80,
  "month": 42.30,
  "currency": "USD"
}
```

#### **Statistiken**
```http
GET /api/dashboard/stats/overview
Authorization: Bearer {token}

Response:
{
  "today": {
    "total_calls": 12,
    "total_cost": 2.45,
    "avg_latency": 1.2,
    "unique_sessions": 8
  },
  "memory": {
    "facts": 247,
    "episodes": 856,
    "pending_learnings": 3
  }
}
```

#### **Aktivität**
```http
GET /api/dashboard/activity?limit=10
Authorization: Bearer {token}

Response:
{
  "items": [
    {
      "call_sid": "CA123...",
      "timestamp": "2025-10-27T14:30:00Z",
      "type": "voice_call",
      "summary": "Gespräch über Workshop-Planung",
      "duration_seconds": 120,
      "tools_used": ["calendar_create", "search_knowledge"]
    }
  ],
  "count": 10,
  "last_ts": "2025-10-27T14:30:00Z"
}
```

#### **Learning Brain Review Queue**
```http
GET /api/dashboard/learning-brain/queue?status=pending
Authorization: Bearer {token}

Response:
{
  "queue": [
    {
      "id": 42,
      "insight": "User bevorzugt morgens fokussierte Arbeit",
      "category": "preference",
      "risk_level": "low",
      "status": "pending",
      "created_at": "2025-10-27T14:00:00Z",
      "reviewed_at": null,
      "reviewer": null,
      "notes": null
    }
  ],
  "total": 3
}
```

#### **Learning Brain Review**
```http
POST /api/dashboard/learning-brain/review/42?action=approve&notes=Approved
Authorization: Bearer {token}

Response:
{
  "success": true,
  "item_id": 42,
  "status": "approved"
}
```

#### **Dashboard Chat mit Môra**
```http
POST /api/dashboard/chat/message
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "Wie viel habe ich heute ausgegeben?",
  "session_id": "sess_abc123"
}

Response:
{
  "response": "Heute hast du $2.45 ausgegeben. Das ist im normalen Bereich!",
  "tool_uses": [
    {
      "tool": "get_usage_stats",
      "input": {"period": "today"},
      "result": {
        "success": true,
        "stats": {
          "total_calls": 12,
          "total_cost": 2.45
        }
      }
    }
  ],
  "session_id": "sess_abc123"
}
```

#### **Website Chat**
```http
POST /mora/chat
Content-Type: application/json

{
  "message": "Was ist Saimôr?",
  "session_id": "chat_xyz789"
}

Response:
{
  "response": "Saimôr begleitet Städte, Unternehmen und Bildungseinrichtungen bei Transformationsprojekten...",
  "session_id": "chat_xyz789",
  "metadata": {
    "cached": true,  // true = FAQ match (kostenlos)
    "pattern": "was ist saimor",
    "cost_usd": 0.00,
    "timestamp": "2025-10-27T15:00:00Z"
  }
}
```

### **n8n Webhooks**

| Webhook | URL | Beschreibung |
|---------|-----|-------------|
| **Knowledge Sync** | `https://n8n.voice.saimor.world/webhook/knowledge-sync` | Synchronisiert Knowledge Base |
| **Learning Brain Update** | `https://n8n.voice.saimor.world/webhook/learning-brain-update` | Triggert Learning Brain Processing |

**Trigger via:**
- Dashboard Button
- Môra Tool (`trigger_knowledge_sync`)

---

## 🛠️ **6. Môra Dashboard Tools**

Môra hat im Dashboard-Chat Zugriff auf folgende Tools:

| Tool | Beschreibung | Parameter |
|------|--------------|-----------|
| `get_memory_facts` | Liest faktuale Memories | `limit`, `search_key` |
| `add_memory_fact` | Fügt neuen Fakt hinzu | `key`, `value`, `category` |
| `get_episodic_memories` | Liest episodische Erinnerungen | `limit` |
| `get_learning_queue` | Holt Learning Brain Queue | `status` |
| `approve_learning` | Approved Learning Item | `item_id`, `notes` |
| `get_usage_stats` | Holt Usage-Statistiken | `period` |
| `trigger_knowledge_sync` | Triggert n8n Workflow | - |

### **Beispiel: Môra nutzt Tool automatisch**

```
User: "Zeig mir meine letzten 5 Fakten"
Môra: (nutzt get_memory_facts tool)
      "Hier sind deine letzten 5 Facts:
       1. Lieblingskaffee: Cappuccino
       2. Arbeitszeit: 9-17 Uhr
       3. Präferenz: Morgens fokussiert
       ..."
```

---

## 🎯 **7. Môra Interaktionsverhalten**

### **Aktiver Kontextbezug**
✅ **Implementiert:** Môra hat Live-Zugriff auf KPIs via Tools

**Beispiel:**
```
User: "Wie läuft es heute?"
Môra: "Heute läuft's super! 12 Voice Calls, $2.45 Costs,
       3 neue Learnings warten auf Review."
```

### **Proaktive Nachrichten**
❌ **Nicht implementiert** (Empfehlung für Frontend)

**Konzept:**
- Costs > $5/Tag → "Hey, deine Costs sind heute höher als üblich"
- 10 Pending Learnings → "Du hast 10 Learnings zum Reviewen"
- Memory > 1000 Facts → "🎉 1000 Facts erreicht!"

### **Hover/Click Feedback**
❌ **Nicht implementiert** (Empfehlung für Frontend)

**Vorschlag:**
- Hover auf Môra Avatar → Augen folgen Cursor
- Click → "Hey! Was kann ich für dich tun?"
- Long-press → Zeigt Quick Actions

### **Audioausgabe**
✅ **Nur Voice Calls:** OpenAI Realtime API (automatisch)
❌ **Dashboard:** Keine TTS (könnte optional aktiviert werden)

---

## 🗄️ **8. Datenbank-Schema (PostgreSQL)**

### **Wichtigste Tabellen**

#### **mora_usage**
Logs aller Voice/Chat Interactions

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `call_sid` | string | Unique Call ID |
| `timestamp` | timestamp | Wann |
| `pipeline` | string | `openai_realtime` / `custom` |
| `transcript` | text | User-Input |
| `response` | text | Môra-Output |
| `cost_usd` | decimal | API-Kosten |
| `metadata` | jsonb | Tools, Duration, etc. |

#### **mem_facts**
Strukturierte Fakten (Key-Value Store)

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `id` | serial | Primary Key |
| `key` | text | Unique Key (z.B. `user_favorite_coffee`) |
| `value` | jsonb | Wert (z.B. `"Cappuccino"`) |
| `source` | text | Quelle (z.B. `voice_learn`) |
| `confidence` | float | 0.0-1.0 |
| `metadata` | jsonb | Category, etc. |

#### **mem_episodic**
Episodische Erinnerungen (Gespräche)

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `id` | serial | Primary Key |
| `summary` | text | Zusammenfassung |
| `ts` | timestamp | Wann |
| `source` | text | `voice` / `chat` / `voice_learn` |
| `tags` | text[] | Tags (z.B. `["important", "learned"]`) |
| `call_sid` | text | Zugehöriger Call |

#### **mem_review_queue**
Learning Brain Review Queue

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `id` | serial | Primary Key |
| `insight` | text | Learning-Text |
| `category` | text | `preference` / `fact` / `goal` / `price` |
| `risk_level` | text | `low` / `high` |
| `status` | text | `pending` / `approved` / `rejected` |
| `created_at` | timestamp | Wann erstellt |
| `reviewed_at` | timestamp | Wann reviewed |
| `reviewer` | text | Wer reviewed |

---

## 🚀 **9. Frontend Integration Guide**

### **Schritt-für-Schritt Anleitung**

#### **1. Authentication Flow**
```javascript
// Login Modal
const token = prompt("Admin Token:");
localStorage.setItem('mora_admin_token', token);

// Auth Wrapper
async function authFetch(url) {
  const token = localStorage.getItem('mora_admin_token');
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.status === 403) {
    // Token ungültig → Login Modal zeigen
    showLoginModal();
  }
  return response.json();
}
```

#### **2. KPI Cards mit Live-Daten**
```javascript
// Alle 30 Sekunden aktualisieren
setInterval(async () => {
  const status = await authFetch('/api/dashboard/status');
  const costs = await authFetch('/api/dashboard/costs/today');
  const stats = await authFetch('/api/dashboard/stats/overview');

  // Update UI
  document.getElementById('cost-today').textContent = `$${costs.today}`;
  document.getElementById('voice-calls').textContent = stats.today.total_calls;
  // ...
}, 30000);
```

#### **3. Activity Feed**
```javascript
const activity = await authFetch('/api/dashboard/activity?limit=10');

activity.items.forEach(item => {
  // Render Timeline Item
  const html = `
    <div class="activity-item">
      <span class="time">${formatTime(item.timestamp)}</span>
      <span class="summary">${item.summary}</span>
      <span class="duration">${item.duration_seconds}s</span>
    </div>
  `;
  // Append to feed
});
```

#### **4. Learning Brain Review Queue**
```javascript
const queue = await authFetch('/api/dashboard/learning-brain/queue?status=pending');

queue.queue.forEach(item => {
  // Render Review Card
  const html = `
    <div class="review-card">
      <p>${item.insight}</p>
      <span class="risk ${item.risk_level}">${item.risk_level} risk</span>
      <button onclick="approve(${item.id})">✅ Approve</button>
      <button onclick="reject(${item.id})">❌ Reject</button>
    </div>
  `;
});

async function approve(itemId) {
  await authFetch(`/api/dashboard/learning-brain/review/${itemId}?action=approve`);
  // Refresh queue
}
```

#### **5. Môra Chat Widget**
```javascript
async function sendChatMessage(message) {
  const response = await authFetch('/api/dashboard/chat/message', {
    method: 'POST',
    body: JSON.stringify({ message, session_id: 'sess_123' })
  });

  // Zeige Môra Response
  addMessageToChat('mora', response.response);

  // Zeige Tool Uses
  response.tool_uses.forEach(tool => {
    showToolResult(tool.tool, tool.result);
  });

  // Refresh Dashboard wenn Write-Operation
  if (isWriteOperation(response.tool_uses)) {
    refreshDashboard();
  }
}
```

#### **6. Achievement Toast (Frontend-seitig)**
```javascript
// Track KPIs
let lastFactsCount = 0;

setInterval(async () => {
  const stats = await authFetch('/api/dashboard/stats/overview');

  // Check Milestones
  if (stats.memory.facts >= 100 && lastFactsCount < 100) {
    showAchievementToast('🎉 Memory Master', '100 Facts erreicht!');
  }

  lastFactsCount = stats.memory.facts;
}, 30000);

function showAchievementToast(title, message) {
  // Toast Notification UI
}
```

#### **7. n8n Workflow Buttons**
```javascript
async function triggerKnowledgeSync() {
  const response = await fetch('https://n8n.voice.saimor.world/webhook/knowledge-sync', {
    method: 'POST',
    body: JSON.stringify({
      source: 'dashboard',
      timestamp: new Date().toISOString()
    })
  });

  if (response.ok) {
    showToast('✅ Knowledge Sync gestartet!');
  }
}
```

---

## 🎨 **10. Empfohlene UI-Komponenten**

### **Framework:** React + Tailwind CSS

| Komponente | Beschreibung | Datenquelle |
|------------|--------------|-------------|
| `<StatusCard />` | System Health (ok/warning/error) | `/api/dashboard/status` |
| `<KPICard />` | Einzelner KPI (Kosten, Calls, Memory) | `/costs/today`, `/stats/overview` |
| `<ActivityFeed />` | Timeline der letzten Aktivitäten | `/api/dashboard/activity` |
| `<LearningReviewCard />` | Learning Brain Review mit Buttons | `/learning-brain/queue` |
| `<MoraChatWidget />` | Chat-Interface mit Môra | `/chat/message` |
| `<CostTrendChart />` | Line Chart für 7-Tage Cost Trends | `/costs/trend` |
| `<MemoryExplorer />` | Browse Facts & Episodic Memories | `/memory/facts`, `/memory/episodic` |
| `<AchievementToast />` | Toast für Meilensteine | Frontend-seitig |

---

## 🔐 **11. Deployment Info**

| Info | Wert |
|------|------|
| **Production URL** | https://voice.saimor.world |
| **Dashboard URL** | https://voice.saimor.world/api/dashboard/ |
| **Voice Number** | +1 815-680-2973 |
| **Hosting** | Hetzner VPS |
| **Database** | PostgreSQL (`n8n_voice`) |
| **Redis** | Für Caching & Rate Limiting |
| **Docker** | ✅ |

---

## 📝 **12. System Prompts (Môra's Persönlichkeit)**

### **Voice Môra**
```
Identität: Voice-Assistentin für Saimôr (Marius' digitale Begleiterin)
Tonalität: Ruhig, klar, resonant - erwachsen und reflektiert
Sprachstil: Deutsch, natürlich, präzise
```

### **Chat Môra (Website)**
```
Identität: Website-Assistentin für Saimôr-Besucher
Tonalität: Freundlich, hilfsbereit, professionell
Sprachstil: Kurze, prägnante Antworten (2-4 Sätze)
```

### **Dashboard Môra**
```
Identität: Dashboard-Assistentin mit Tool-Zugriff
Tonalität: Neugierig, lernwillig, proaktiv
Sprachstil: Erklärt was sie gerade macht
```

---

## ✅ **13. Zusammenfassung - Was du jetzt tun kannst**

### **Du hast jetzt:**

1. ✅ **Vollständiges KPI-Mapping** → Du weißt welche Metriken verfügbar sind
2. ✅ **API-Endpunkte** → Du kannst alle Daten abrufen
3. ✅ **Môra-Logik** → Du verstehst wie Môra reagiert und welche Tools sie hat
4. ✅ **Achievement-System-Konzept** → Du kannst es im Frontend implementieren
5. ✅ **Session-Management** → Du weißt wie Auth & Sessions funktionieren
6. ✅ **Integration Guide** → Step-by-step Anleitung für Frontend
7. ✅ **UI-Komponenten-Vorschläge** → Du weißt was du bauen sollst

### **Nächste Schritte:**

1. **JSON-Datei verwenden:** `MORA_CORE_SYSTEM_MAPPING.json` für strukturierte Daten
2. **Frontend aufbauen:** React + Tailwind basierend auf den Komponenten-Vorschlägen
3. **Polling implementieren:** 30s Interval für KPI-Updates
4. **Môra Chat integrieren:** Dashboard Chat Widget mit Tool-Result-Anzeige
5. **Achievement-System bauen:** Frontend-seitige Toast-Notifications
6. **Proaktive Môra-Nachrichten:** Optional für bessere UX

---

## 📞 **Kontakt & Support**

Bei Fragen zu diesem Mapping:
- **Datei-Referenzen:** Alle Pfade im JSON enthalten
- **API-Tests:** Nutze `curl` oder Postman mit Bearer Token
- **Debugging:** Logs in `voice-realtime/` Server

**Viel Erfolg beim Frontend-Bau! 🚀**
