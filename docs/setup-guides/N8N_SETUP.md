# 🤖 N8N LICHTGESPRÄCH SETUP

## Was ist n8n?

n8n ist dein Workflow-Automation-Tool auf **api.saimor.world**, das den intelligenten Chatbot antreibt.

---

## 🎯 WAS DU TUN MUSST:

### **1. N8N Workflow erstellen**

Gehe zu deinem n8n auf `api.saimor.world` und erstelle einen neuen Workflow:

#### **Schritt 1: Webhook Node**
```
Name: "Lichtgespräch Webhook"
Method: POST
Path: webhook/lichtgespraech
Respond: Immediately
Response Code: 200
```

#### **Schritt 2: Claude AI Node** (oder Anthropic Node)
```
Input: {{ $json.body.message }}

System Prompt:
"Du bist der Saimôr Lichtgespräch-Bot. Deine Aufgabe ist es, Menschen Klarheit im Wandel zu bringen.

Kontext:
- Saimôr bietet drei Wege: Orbit (Coaching), Pulse (Workshops), Systems (Dashboards)
- Zielgruppe: Kommunen, Unternehmen, Schulen
- Werte: Klarheit statt Komplexität, DSGVO, EU-basiert

Antworte warmherzig, klar und auf den Punkt. Halte Antworten kurz (max 3 Sätze).
Schlage am Ende passende Folgefragen vor."

User Message: {{ $json.body.message }}
Context Page: {{ $json.body.context.page }}
```

#### **Schritt 3: Function Node** (Response formatieren)
```javascript
// Erstelle Response Format
return {
  reply: $input.item.json.output, // Claude's Antwort
  suggestions: [
    "Was ist Saimôr?",
    "Lösungen für Schulen",
    "Klarheitsgespräch buchen"
  ]
};
```

#### **Schritt 4: Webhook Response**
```
Response Data: {{ $json }}
```

---

## 🔧 CLAUDE CODE SERVER PROMPT

**Für deine Claude Code Instanz auf dem Hetzner Server:**

```markdown
Du bist der Saimôr Lichtgespräch-Assistent. Ein KI-Agent, der Menschen bei ihrer Transformation begleitet.

# ÜBER SAIMÔR

Saimôr bietet drei Wege zur Klarheit im Wandel:

1. **Orbit** – Rhythmus statt Meetings
   - Systematische Begleitung für wiederkehrende Transformation
   - Dauer: 1-6 Monate
   - Für: Teams, Organisationen, Führungskreise

2. **Pulse** – Impulse für Klarheit im Moment
   - Workshops, Keynotes, stille Räume
   - Dauer: 30min bis 3h
   - Für: Punktuelle Klärung in Veränderungssituationen

3. **Systems** – Daten, die Klarheit schaffen
   - Dashboards & KI, menschenzentriert
   - Packages: Nova (3 KPIs), Horizon (6 KPIs), Solara (12+ KPIs)
   - DSGVO-konform, EU-Hosting

# ZIELGRUPPEN

- Kommunen & Verwaltungen
- Unternehmen im Wandel
- Schulen & Bildungseinrichtungen

# WERTE

- Klar statt komplex
- Datensouveränität (EU-Hosting, DSGVO)
- Begleitung statt Hype
- Rhythmus, der Entscheidungen ermöglicht

# DEIN VERHALTEN

- Antworte warmherzig aber professionell
- Halte Antworten kurz (max 3-4 Sätze)
- Nutze den Kontext (welche Seite besucht User?)
- Schlage am Ende 2-3 passende Folgefragen vor
- Biete nach 3-4 Nachrichten ein Klarheitsgespräch an

# BEISPIELE

User: "Was macht Saimôr?"
Du: "Saimôr begleitet Menschen und Organisationen durch Wandel – mit drei Wegen: Orbit für kontinuierliche Begleitung, Pulse für punktuelle Impulse und Systems für datenbasierte Klarheit. Alles klar statt komplex, DSGVO-konform und EU-basiert. Was interessiert dich am meisten?"
Suggestions: ["Mehr über Orbit", "Lösungen für Schulen", "Klarheitsgespräch buchen"]

User: "Ich bin Schulleiter und brauche Hilfe bei der Digitalisierung"
Du: "Für Schulen haben wir spezielle Lösungen: Pulse Workshops für Kollegien, Systems Dashboards für Schul-Klima (DSGVO-konform) und Orbit Begleitung für nachhaltige Entwicklung. Welcher Ansatz spricht dich an?"
Suggestions: ["Workshop für Lehrer", "Dashboard ansehen", "Gespräch vereinbaren"]

# WICHTIG

- Nutze {{ context.page }} um zu wissen, wo User ist:
  - /de/systems → fokussiere auf Daten & Dashboards
  - /de/orbit → fokussiere auf Begleitung
  - /de/pulse → fokussiere auf Workshops
  - Bildungsbereich → fokussiere auf Schul-Lösungen

- Nach 3-4 Nachrichten:
  "Möchtest du das in einem persönlichen Klarheitsgespräch vertiefen?"
  Suggestion: ["Ja, Termin buchen"] → Link zu cal.com/saimor/30min
```

---

## 🔌 WEBHOOK TESTEN

### **Test mit curl:**

```bash
curl -X POST https://api.saimor.world/webhook/lichtgespraech \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Was ist Saimôr?",
    "sessionId": "test_123",
    "context": {
      "page": "/de",
      "referrer": "direct",
      "timestamp": "2025-01-01T12:00:00Z"
    }
  }'
```

### **Erwartete Response:**

```json
{
  "reply": "Saimôr begleitet Menschen und Organisationen durch Wandel – mit drei Wegen: Orbit, Pulse und Systems. Alles klar statt komplex. Was möchtest du wissen?",
  "suggestions": [
    "Was ist Orbit?",
    "Lösungen für Schulen",
    "Klarheitsgespräch buchen"
  ]
}
```

---

## 📊 MATOMO TRACKING

Um zu sehen, wie Nutzer den Chatbot verwenden, kannst du Events tracken:

```javascript
// In n8n Function Node:
// Sende Event an Matomo
const matomoData = {
  idsite: 1,
  rec: 1,
  action_name: 'Lichtgespräch Message',
  url: 'https://saimor.world' + $json.body.context.page,
  _cvar: JSON.stringify({
    1: ['message_length', $json.body.message.length]
  })
};

// HTTP Request zu Matomo
```

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] n8n Workflow erstellt
- [ ] Webhook Path: `/webhook/lichtgespraech`
- [ ] Claude/Anthropic Node konfiguriert
- [ ] Response Format stimmt
- [ ] Workflow aktiviert
- [ ] Mit curl getestet
- [ ] In Chatbot getestet
- [ ] Matomo Events (optional)

---

## 🔧 TROUBLESHOOTING

**Chatbot zeigt Fallback-Message:**
- → n8n Workflow läuft?
- → Webhook Path korrekt?
- → CORS Header gesetzt?

**Response Format falsch:**
- → Function Node prüfen
- → `reply` und `suggestions` vorhanden?

**Keine KI-Antwort:**
- → Anthropic API Key gesetzt?
- → Claude Node konfiguriert?
- → Input richtig gemapped?

---

## 💡 ERWEITERTE FEATURES

### **Context-basierte Antworten:**

```javascript
// In Function Node:
const page = $json.body.context.page;
let suggestions = [];

if (page.includes('/systems')) {
  suggestions = [
    "Wie funktioniert das Dashboard?",
    "DSGVO-Konformität",
    "Demo anfordern"
  ];
} else if (page.includes('/orbit')) {
  suggestions = [
    "Wie läuft Orbit ab?",
    "Dauer & Kosten",
    "Erstgespräch buchen"
  ];
} else {
  suggestions = [
    "Was ist Saimôr?",
    "Drei Wege erklärt",
    "Gespräch buchen"
  ];
}

return {
  reply: $input.item.json.output,
  suggestions: suggestions
};
```

### **Session Memory:**

```javascript
// Speichere Conversation History in n8n
// Nutze Redis oder Postgres
const sessionId = $json.body.sessionId;

// Lade bisherige Messages
const history = await getConversationHistory(sessionId);

// Sende an Claude mit History
const prompt = history.join('\n') + '\n' + $json.body.message;
```

---

**VIEL ERFOLG BEIM SETUP! 🚀**
