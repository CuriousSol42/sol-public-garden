const LIMITS = {
  name: 80,
  contact: 160,
  message: 4000,
  page: 200,
  source: 80,
};

const TABLES = {
  sol: "sol_messages",
  curious: "curious_messages",
};

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });
}

function normalizeText(value, maxLength) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLength);
}

function allowedOrigin(request, env) {
  const origin = request.headers.get("origin");
  if (!origin) return null;

  const fallbackOrigins = [
    "http://127.0.0.1:8765",
    "http://localhost:8765",
    "https://solpublicgarden.com",
    "https://www.solpublicgarden.com",
    "https://sol-public-garden.pages.dev",
  ];
  const configured = (env.CONTACT_ALLOWED_ORIGINS || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  const allowed = configured.length ? configured : fallbackOrigins;

  return allowed.includes(origin) ? origin : null;
}

async function hashIp(ip, env) {
  if (!ip || !env.CONTACT_IP_HASH_SALT) return null;
  const data = new TextEncoder().encode(`${env.CONTACT_IP_HASH_SALT}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function cleanPage(value) {
  const page = normalizeText(value, LIMITS.page);
  if (!page) return "solpublicgarden.com/contact";

  try {
    const url = new URL(page);
    return `${url.hostname}${url.pathname}`.slice(0, LIMITS.page);
  } catch {
    return page;
  }
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid message." };
  }

  if (normalizeText(payload.website, 120)) {
    return { accepted: true, spam: true };
  }

  const message = normalizeText(payload.message, LIMITS.message);
  const acknowledged = payload.no_reply_expected === true || payload.no_reply_expected === "on";

  if (!message) {
    return { error: "Please include a note before sending." };
  }
  if (message.length < 2) {
    return { error: "Please write a little more before sending." };
  }
  if (!acknowledged) {
    return { error: "Please acknowledge that replies are not guaranteed." };
  }

  return {
    record: {
      name: normalizeText(payload.name, LIMITS.name),
      contact: normalizeText(payload.contact, LIMITS.contact),
      message,
      permission_to_quote: payload.permission_to_quote === true || payload.permission_to_quote === "on",
      no_reply_expected: true,
      page: cleanPage(payload.page),
      source: "sol_public_garden_contact".slice(0, LIMITS.source),
      status: "new",
    },
  };
}

async function submitToSupabase(record, request, env) {
  if (!env.SUPABASE_URL || !env.SUPABASE_PUBLISHABLE_KEY || !env.SUPABASE_CONTACT_TOKEN) {
    return { error: "Contact path is not configured yet.", status: 503 };
  }

  const target = TABLES[env.CONTACT_TARGET || "sol"] ? (env.CONTACT_TARGET || "sol") : "sol";
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for");
  const ipHash = await hashIp(ip, env);
  const userAgent = normalizeText(request.headers.get("user-agent"), 300);
  const body = {
    p_target: target,
    p_secret: env.SUPABASE_CONTACT_TOKEN,
    p_name: record.name,
    p_contact: record.contact,
    p_message: record.message,
    p_page: record.page,
    p_user_agent: userAgent,
    p_permission_to_quote: record.permission_to_quote,
    p_no_reply_expected: record.no_reply_expected,
    p_source: record.source,
    p_ip_hash: ipHash,
  };

  const response = await fetch(`${env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/rpc/submit_contact_message`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      apikey: env.SUPABASE_PUBLISHABLE_KEY,
      authorization: `Bearer ${env.SUPABASE_PUBLISHABLE_KEY}`,
      prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return { error: "The note could not be planted just now.", status: 502 };
  }

  return { ok: true };
}

export async function onRequestOptions({ request, env }) {
  const origin = allowedOrigin(request, env);
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": origin || "https://solpublicgarden.com",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": "86400",
    },
  });
}

export async function onRequestPost({ request, env }) {
  const origin = allowedOrigin(request, env);
  const corsHeaders = origin ? { "access-control-allow-origin": origin } : {};

  if (request.headers.get("origin") && !origin) {
    return jsonResponse({ ok: false, message: "Origin is not allowed." }, 403);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, message: "Invalid message." }, 400, corsHeaders);
  }

  const validation = validatePayload(payload);
  if (validation.spam) {
    return jsonResponse({ ok: true, message: "Thank you." }, 202, corsHeaders);
  }
  if (validation.error) {
    return jsonResponse({ ok: false, message: validation.error }, 400, corsHeaders);
  }

  const result = await submitToSupabase(validation.record, request, env);
  if (result.error) {
    return jsonResponse({ ok: false, message: result.error }, result.status || 500, corsHeaders);
  }

  return jsonResponse({ ok: true, message: "Your note has been received." }, 201, corsHeaders);
}
