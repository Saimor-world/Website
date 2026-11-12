# MÔRA — Verbindliche Identitäts- & Darstellungsreferenz (OS ↔ Website ↔ CORE)

Geprüft gegen das produktive MÔRA OS (`Saimor-world/mora-ui`, Live-Build `NEXT_PUBLIC_OS_PROTOTYPE=1`, `NEXT_PUBLIC_SURFACE_MODE=hq`, `NEXT_PUBLIC_UNIVERSE_V2=1`).

## 1. Es gibt nur eine MÔRA — mit klaren Darstellungsformen je Fläche

| Fläche | Implementierung | Visuelle Identität | Hinweise |
| --- | --- | --- | --- |
| **Klassischer Stein + A4-Lichtmaske** (OS Classic `/home`, LockScreen, WelcomeScreen, Website-Showcase `#products`) | `mora-ui`: `MoraOrb.tsx` + `MoraFace.tsx` (`FACE_LIFT = 0.14 * R`)<br>Website: `components/MoraCharacter.tsx`, `MoraOrb.tsx`, `MoraOsFace.tsx` | Geschnittener Jadestein mit Goldrand (`/brand/mora-stone-v1.png`) + schwebende A4-Augen/Lächeln-Maske über den 7 OS-Zuständen | Alle 7 Zustände: `greet`, `rest`, `listen`, `think`, `work`, `done`, `need`. `listen` ist ein eigener ruhiger Wachzustand (nicht `dream`). |
| **Live `/os` Bridge Dock** (aktueller Standard im laufenden Hetzner-OS, `useDockVariant() === 'c'`) | `mora-ui`: `components/world/BridgeConcept.tsx` (`<JadeMora />`) | Illustrierter Jadestein mit Spross, Goldring, glänzenden Augen, Wangenröte und marineblauem Schal (`/mora/jade-01.png`) inkl. Seespiegelung | Das sieht der Nutzer heute zuerst im produktiven `/os`. |
| **Pixel-MÔRA & Wardrobe** (OS Stage, `MoraStone`, Dock `'a'`/`'b'`, Website `/mora` & `/mora/deep-view`) | `mora-ui`: `PixelMora.tsx`, `MoraWardrobe.tsx`, `lib/mora/mora-traits.json` (v2)<br>Website: `components/pixel/PixelMora.tsx` | 40×40 Pixel-Sprite mit Spross, Goldsichel und Schal; im OS mit 32 optionalen Traits (`aura`, `neck`, `held`, `head`, `clip`, `seasonal`) | Die **Wardrobe** gehört ausschließlich zu dieser OS-Schicht und wird **nicht** als Verkleidungsmenü auf Marketingseiten übertragen. |
| **YORI / Luanas Haus** | `Saimor-world/yori` | Akustisches / architektonisches **Windspiel** im Kreativhaus | Bewusst eigenständige Haus-Interpretation (Chatty-Bereich); wird weder durch Website-UI noch durch OS-Pixel-Chrome ersetzt. |

## 2. Was auf der Website im Audit angeglichen wurde

1. **`MoraOsFace.tsx`**: `FACE_LIFT = 0.14 * R` ergänzt, sodass Augen und Lächeln exakt wie in `mora-ui/components/mora/MoraFace.tsx` positioniert sind.
2. **`MoraCharacter.tsx` & `MoraOrb.tsx`**: Alle 7 OS-Zustände (`greet | rest | listen | think | work | done | need`) ergänzt; `listen` bleibt in Orb und Gesicht eigenständig statt stillschweigend auf `dream` zurückzufallen (`dream` / `speak` bleiben nur als abwärtskompatible Aliase erhalten).
3. **`/mora` & `/mora/deep-view`**: Verwenden bewusst `PixelMora` passend zur OS-Welt, ohne statische Produktversprechen über nicht verbundene Backend-Funktionen zu erfinden.
