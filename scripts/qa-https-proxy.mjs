/** Local CI transport only. Keeps the real CSP intact for WebKit's HTTPS upgrade. */
import https from 'node:https';
import http from 'node:http';
import { readFileSync } from 'node:fs';

const tls = {
  key: readFileSync('.qa/localhost.key'),
  cert: readFileSync('.qa/localhost.crt'),
};
for (const [port, upstream] of [[3443, 3001], [3444, 3002]]) {
  https.createServer(tls, (request, response) => {
    const proxy = http.request({
      hostname: '127.0.0.1', port: upstream,
      path: request.url, method: request.method,
      headers: { ...request.headers, 'x-forwarded-proto': 'https' },
    }, result => {
      response.writeHead(result.statusCode || 502, result.headers);
      result.pipe(response);
    });
    proxy.on('error', () => {
      if (!response.headersSent) response.writeHead(502);
      response.end('Local QA upstream unavailable');
    });
    request.pipe(proxy);
  }).listen(port, '127.0.0.1', () => process.stdout.write(`QA HTTPS ${port} → ${upstream}\n`));
}
