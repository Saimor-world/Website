// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EventEmitter } from 'node:events';
const mocks = vi.hoisted(() => ({ lookup: vi.fn(), request: vi.fn() }));
vi.mock('node:dns/promises', () => ({ default: { lookup: mocks.lookup } }));
vi.mock('node:https', () => ({ default: { request: mocks.request } }));
import { fetchPublicPage, resolvePublicTarget } from '@/lib/public-network';
import { isPrivateIp } from '@/lib/domain-safety';

describe('public recon network boundary', () => {
  beforeEach(() => vi.resetAllMocks());
  it.each(['::', '::1', '::ffff:127.0.0.1', '::ffff:7f00:1', 'fc00::1', 'fe80::1', '2001:db8::1', '2002:7f00:1::', '3fff::1', '192.0.2.1', '198.51.100.2', '203.0.113.2'])('blocks non-public address %s', ip => {
    expect(isPrivateIp(ip)).toBe(true);
  });
  it.each(['8.8.8.8', '1.1.1.1', '2606:4700:4700::1111', '2001:4860:4860::8888'])('permits public address %s', ip => {
    expect(isPrivateIp(ip)).toBe(false);
  });
  it('rejects mixed DNS answers before opening a socket', async () => {
    mocks.lookup.mockResolvedValue([{ address: '1.1.1.1', family: 4 }, { address: '127.0.0.1', family: 4 }]);
    await expect(fetchPublicPage('https://example.com')).rejects.toThrow('Non-public');
    expect(mocks.request).not.toHaveBeenCalled();
  });
  it('rejects IPv6-only internal DNS and empty answers', async () => {
    mocks.lookup.mockResolvedValue([{ address: 'fd00::1', family: 6 }]);
    await expect(resolvePublicTarget('example.com')).rejects.toThrow('Non-public');
    mocks.lookup.mockResolvedValue([]);
    await expect(resolvePublicTarget('example.com')).rejects.toThrow('Non-public');
  });
  it.each(['http://example.com', 'https://example.com:8080', 'https://user:pass@example.com'])('rejects unsafe URL %s without DNS', async url => {
    await expect(fetchPublicPage(url)).rejects.toThrow();
    expect(mocks.lookup).not.toHaveBeenCalled();
  });
  it('pins the validated address and returns redirects without following them', async () => {
    const target = { address: '1.1.1.1', family: 4 };
    mocks.lookup.mockResolvedValue([target]);
    let options: any;
    mocks.request.mockImplementation((_url, opts, done) => {
      options = opts;
      const request = Object.assign(new EventEmitter(), { end() {
        done({ statusCode: 302, headers: { location: 'http://127.0.0.1/', 'set-cookie': 'private=value' }, destroy() {} });
        request.emit('close');
      }, destroy() {} });
      return request;
    });
    const response = await fetchPublicPage('https://example.com');
    const callback = vi.fn();
    options.lookup('example.com', { all: true }, callback);
    expect(callback).toHaveBeenCalledWith(null, [target]);
    expect(mocks.lookup).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(302);
    expect(response.headers.get('set-cookie')).toBeNull();
  });
});
