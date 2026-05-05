import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function csvCell(value: unknown) {
  const text = value === null || value === undefined ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'owner') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const audits = await prisma.securityAudit.findMany({
    orderBy: { createdAt: 'desc' },
    include: { wallEntry: true, user: true },
  });

  const header = [
    'createdAt',
    'companyName',
    'email',
    'domain',
    'industry',
    'companySize',
    'score',
    'level',
    'wallStatus',
    'accountLinked',
    'auditId',
  ];

  const rows = audits.map((audit) => [
    audit.createdAt.toISOString(),
    audit.name,
    audit.email,
    audit.targetDomain || audit.domain || '',
    audit.industry || '',
    audit.companySize || '',
    audit.score,
    audit.level,
    audit.wallEntry?.status || '',
    audit.userId ? 'yes' : 'no',
    audit.id,
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map(csvCell).join(','))
    .join('\n');

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="saimor-owner-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
