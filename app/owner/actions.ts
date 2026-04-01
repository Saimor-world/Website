'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { requestCoreOwnerJson } from '@/lib/core-owner';

function optionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim();
  return normalized ? normalized : undefined;
}

function requiredString(formData: FormData, key: string) {
  const value = optionalString(formData, key);
  if (!value) {
    throw new Error(`${key} is required`);
  }
  return value;
}

function parseBooleanValue(value: FormDataEntryValue | null): boolean | undefined {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  if (normalized === 'true' || normalized === '1' || normalized === 'on') return true;
  if (normalized === 'false' || normalized === '0' || normalized === 'off') return false;
  return undefined;
}

function checked(formData: FormData, key: string) {
  return parseBooleanValue(formData.get(key)) === true;
}

async function requireOwnerSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/owner/login?callbackUrl=/owner');
  }
  if (session.user.role !== 'owner') {
    redirect('/owner?error=owner-access-required');
  }
  return session;
}

function redirectWithFeedback(kind: 'notice' | 'error', message: string) {
  const params = new URLSearchParams();
  params.set(kind, message);
  redirect(`/owner?${params.toString()}`);
}

export async function createOwnerCompanyAction(formData: FormData) {
  await requireOwnerSession();

  try {
    const payload = {
      name: requiredString(formData, 'name'),
      tenant_id: optionalString(formData, 'tenant_id'),
      owner_id: optionalString(formData, 'owner_id'),
      description: optionalString(formData, 'description'),
      logo_url: optionalString(formData, 'logo_url'),
      is_demo: checked(formData, 'is_demo'),
      allow_exception: checked(formData, 'allow_exception'),
    };

    const result = await requestCoreOwnerJson('/v3/system/owner/companies?raw=true', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!result.ok) {
      redirectWithFeedback('error', result.error || 'company-create-failed');
    }

    revalidatePath('/owner');
    redirectWithFeedback('notice', `company-created:${payload.name}`);
  } catch (error) {
    redirectWithFeedback('error', error instanceof Error ? error.message : 'company-create-failed');
  }
}

export async function updateOwnerCompanyAction(formData: FormData) {
  await requireOwnerSession();

  try {
    const companyId = requiredString(formData, 'company_id');
    const payload = {
      name: optionalString(formData, 'name'),
      description: optionalString(formData, 'description'),
      logo_url: optionalString(formData, 'logo_url'),
      owner_id: optionalString(formData, 'owner_id'),
      is_demo: checked(formData, 'is_demo'),
    };

    const result = await requestCoreOwnerJson(`/v3/system/owner/companies/${companyId}?raw=true`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!result.ok) {
      redirectWithFeedback('error', result.error || 'company-update-failed');
    }

    revalidatePath('/owner');
    redirectWithFeedback('notice', `company-updated:${companyId}`);
  } catch (error) {
    redirectWithFeedback('error', error instanceof Error ? error.message : 'company-update-failed');
  }
}

export async function createOwnerUserAction(formData: FormData) {
  await requireOwnerSession();

  try {
    const payload = {
      email: requiredString(formData, 'email'),
      password: requiredString(formData, 'password'),
      role: optionalString(formData, 'role') || 'member',
      tenant_id: optionalString(formData, 'tenant_id'),
      full_name: optionalString(formData, 'full_name'),
      default_company_id: optionalString(formData, 'default_company_id'),
      email_verified: checked(formData, 'email_verified'),
      is_active: parseBooleanValue(formData.get('is_active')) ?? true,
    };

    const result = await requestCoreOwnerJson('/v3/system/owner/users?raw=true', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!result.ok) {
      redirectWithFeedback('error', result.error || 'user-create-failed');
    }

    revalidatePath('/owner');
    redirectWithFeedback('notice', `user-created:${payload.email}`);
  } catch (error) {
    redirectWithFeedback('error', error instanceof Error ? error.message : 'user-create-failed');
  }
}

export async function updateOwnerUserAction(formData: FormData) {
  await requireOwnerSession();

  try {
    const userId = requiredString(formData, 'user_id');
    const payload = {
      role: optionalString(formData, 'role'),
      is_active: parseBooleanValue(formData.get('is_active')),
      full_name: optionalString(formData, 'full_name'),
      email_verified: parseBooleanValue(formData.get('email_verified')),
      default_company_id: optionalString(formData, 'default_company_id') || '',
    };

    const result = await requestCoreOwnerJson(`/v3/system/owner/users/${userId}?raw=true`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!result.ok) {
      redirectWithFeedback('error', result.error || 'user-update-failed');
    }

    revalidatePath('/owner');
    redirectWithFeedback('notice', `user-updated:${userId}`);
  } catch (error) {
    redirectWithFeedback('error', error instanceof Error ? error.message : 'user-update-failed');
  }
}
