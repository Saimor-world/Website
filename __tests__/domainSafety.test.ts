import { describe, expect, it } from 'vitest';
import { isPrivateIp, normalizeScanDomain, validateScanDomain } from '@/lib/domain-safety';

describe('domain safety', () => {
  it('normalizes public domains from urls and paths', () => {
    expect(normalizeScanDomain('https://Example.com/foo?bar=1')).toBe('example.com');
    expect(normalizeScanDomain('www.example.com:443/path')).toBe('www.example.com');
  });

  it('accepts public domain names', () => {
    expect(validateScanDomain('saimor.world')).toEqual({ ok: true, domain: 'saimor.world' });
  });

  it('rejects local hostnames and direct IP scans', () => {
    expect(validateScanDomain('localhost').ok).toBe(false);
    expect(validateScanDomain('printer.local').ok).toBe(false);
    expect(validateScanDomain('127.0.0.1').ok).toBe(false);
    expect(validateScanDomain('192.168.1.20').ok).toBe(false);
  });

  it('classifies private and reserved IPv4 ranges', () => {
    expect(isPrivateIp('10.0.0.5')).toBe(true);
    expect(isPrivateIp('172.20.1.1')).toBe(true);
    expect(isPrivateIp('192.168.0.10')).toBe(true);
    expect(isPrivateIp('127.0.0.1')).toBe(true);
    expect(isPrivateIp('8.8.8.8')).toBe(false);
  });
});
