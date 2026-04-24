import { prisma } from '@/lib/prisma';

/**
 * Extracts facts from a user message and saves them to the UserFact table.
 * In a real production environment, this would call an LLM (Gemini) 
 * to parse the message for entities, preferences, and goals.
 */
export async function extractAndSaveFacts(userId: string, message: string) {
  try {
    const lowerMsg = message.toLowerCase();
    const discoveredFacts: { key: string; value: string }[] = [];

    // Simple keyword-based extraction (Simulation of AI extraction)
    if (lowerMsg.includes('arbeite mit') || lowerMsg.includes('nutze')) {
      const tools = ['react', 'next.js', 'node', 'python', 'typescript', 'figma', 'notion', 'slack'];
      for (const tool of tools) {
        if (lowerMsg.includes(tool)) {
          discoveredFacts.push({ key: 'tech_stack', value: tool });
        }
      }
    }

    if (lowerMsg.includes('ziel') || lowerMsg.includes('moechte')) {
      if (lowerMsg.includes('skalieren')) discoveredFacts.push({ key: 'goal', value: 'Skalierung' });
      if (lowerMsg.includes('sicherheit')) discoveredFacts.push({ key: 'goal', value: 'Sicherheit' });
      if (lowerMsg.includes('automatisieren')) discoveredFacts.push({ key: 'goal', value: 'Automatisierung' });
    }

    if (lowerMsg.includes('bin') || lowerMsg.includes('arbeite als')) {
        if (lowerMsg.includes('ceo') || lowerMsg.includes('chef')) discoveredFacts.push({ key: 'role', value: 'Management' });
        if (lowerMsg.includes('entwickler') || lowerMsg.includes('dev')) discoveredFacts.push({ key: 'role', value: 'Engineering' });
    }

    // Save discovered facts
    for (const fact of discoveredFacts) {
      // Upsert to avoid duplicates for the same key
      const existing = await prisma.userFact.findFirst({
        where: { userId, key: fact.key, value: fact.value }
      });

      if (!existing) {
        await prisma.userFact.create({
          data: {
            userId,
            key: fact.key,
            value: fact.value,
            source: 'chat',
            confidence: 0.9
          }
        });
      }
    }

    return discoveredFacts;
  } catch (error) {
    console.error('[Memory] Error extracting facts:', error);
    return [];
  }
}
