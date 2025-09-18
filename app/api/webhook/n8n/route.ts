import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface N8NWebhookPayload {
  event: string;
  timestamp: string;
  data: any;
  source?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Validate webhook secret for security
    const headersList = headers();
    const webhookSecret = headersList.get('x-webhook-secret');

    if (webhookSecret !== process.env.N8N_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: N8NWebhookPayload = await request.json();

    // Process different webhook events
    switch (body.event) {
      case 'contact_form_submitted':
        await handleContactFormSubmission(body.data);
        break;

      case 'booking_completed':
        await handleBookingCompletion(body.data);
        break;

      case 'chat_interaction':
        await handleChatInteraction(body.data);
        break;

      case 'user_journey_milestone':
        await handleUserJourneyMilestone(body.data);
        break;

      default:
        console.log('Unknown webhook event:', body.event);
    }

    // Send response to n8n
    return NextResponse.json({
      received: true,
      event: body.event,
      timestamp: new Date().toISOString(),
      processingStatus: 'completed'
    });

  } catch (error) {
    console.error('N8N webhook processing error:', error);
    return NextResponse.json(
      {
        error: 'Processing failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Health check endpoint for n8n
  return NextResponse.json({
    status: 'active',
    service: 'saimor-n8n-webhook',
    timestamp: new Date().toISOString(),
    endpoints: {
      webhook: '/api/webhook/n8n',
      chat: '/api/chat',
      contact: '/api/contact'
    }
  });
}

async function handleContactFormSubmission(data: any) {
  console.log('Processing contact form submission:', {
    name: data.name,
    email: data.email,
    timestamp: data.timestamp
  });

  // Here you could:
  // - Save to database
  // - Send to CRM
  // - Trigger email automation
  // - Create calendar event

  // Example: Send to external CRM or email service
  if (process.env.CRM_WEBHOOK_URL) {
    await fetch(process.env.CRM_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'new_contact',
        data: data
      })
    });
  }
}

async function handleBookingCompletion(data: any) {
  console.log('Processing booking completion:', {
    bookingId: data.bookingId,
    clientEmail: data.email,
    sessionType: data.sessionType
  });

  // Booking follow-up automation
  // - Send confirmation email
  // - Add to calendar
  // - Prepare session materials
  // - Set reminders
}

async function handleChatInteraction(data: any) {
  console.log('Processing chat interaction:', {
    sessionId: data.sessionId,
    messageCount: data.messageCount,
    engagement: data.engagement
  });

  // Chat analytics and triggers
  // - Track user engagement
  // - Identify conversion opportunities
  // - Trigger follow-up sequences
  // - Update user profile
}

async function handleUserJourneyMilestone(data: any) {
  console.log('Processing user journey milestone:', {
    milestone: data.milestone,
    userId: data.userId,
    value: data.value
  });

  // Journey-based automation
  // - Personalized content delivery
  // - Engagement optimization
  // - Conversion tracking
  // - Experience personalization
}

// Utility function to send data back to n8n workflows
async function triggerN8NWorkflow(workflowId: string, data: any) {
  const n8nBaseUrl = process.env.N8N_BASE_URL;
  const n8nApiKey = process.env.N8N_API_KEY;

  if (!n8nBaseUrl || !n8nApiKey) {
    console.log('N8N configuration missing');
    return;
  }

  try {
    await fetch(`${n8nBaseUrl}/api/v1/workflows/${workflowId}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-N8N-API-KEY': n8nApiKey
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('N8N workflow trigger error:', error);
  }
}