// In-memory sliding window rate limiter for serverless handler warm starts
const ipCache = new Map();

// Clean up expired IP entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipCache.entries()) {
    if (now > data.resetTime) {
      ipCache.delete(ip);
    }
  }
}, 15 * 60 * 1000);

/**
 * Checks rate limit for a given IP address (Default: 20 requests / hour)
 * @param {string} ip 
 * @param {number} maxRequests 
 * @param {number} windowMs 
 * @returns {{allowed: boolean, remaining: number, resetTime: number}}
 */
export function checkRateLimit(ip = "127.0.0.1", maxRequests = 20, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  let record = ipCache.get(ip);

  if (!record || now > record.resetTime) {
    record = {
      count: 1,
      resetTime: now + windowMs,
    };
    ipCache.set(ip, record);
    return { allowed: true, remaining: maxRequests - 1, resetTime: record.resetTime };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count += 1;
  return { allowed: true, remaining: maxRequests - record.count, resetTime: record.resetTime };
}
