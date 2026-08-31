const requests = new Map(); 

const WINDOW_MS = 60 * 60 * 1000; 
const MAX_REQUESTS = 3;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = requests.get(ip) || [];

  // remove timestamps fora da janela de tempo
  const recent = timestamps.filter(t => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    return true; // bloqueado
  }

  recent.push(now);
  requests.set(ip, recent);
  return false;
}

// limpeza periódica pra não vazar memória
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of requests.entries()) {
    const recent = timestamps.filter(t => now - t < WINDOW_MS);
    if (recent.length === 0) requests.delete(ip);
    else requests.set(ip, recent);
  }
}, 15 * 60 * 1000); // a cada 15 min

module.exports = { isRateLimited };