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

describe('isPrivateIp hardening', () => {
  it('blocks metadata, IPv6 loopback/link-local/ULA and mapped addresses', () => {
    for (const ip of ['169.254.169.254', '::1', '::', 'fe80::1', 'fd00::1', 'fc00::1', '::ffff:127.0.0.1', '::ffff:10.0.0.1', '64:ff9b::a00:1', 'ff02::1', '0.0.0.0']) {
      expect(isPrivateIp(ip)).toBe(true);
    }
    expect(isPrivateIp('2606:4700:4700::1111')).toBe(false);
    expect(isPrivateIp('1.1.1.1')).toBe(false);
  });
});
