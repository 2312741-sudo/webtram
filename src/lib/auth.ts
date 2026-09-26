export const SESSION_COOKIE_NAME = "tram_admin_session";

const SECRET = process.env.ADMIN_SECRET || "tram_admin_secret_key_dalat_super_secure_2026";

async function getCryptoKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminToken(username: string): Promise<string> {
  const payload = {
    username,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const jsonStr = JSON.stringify(payload);
  const base64Payload = btoa(unescape(encodeURIComponent(jsonStr)));

  const key = await getCryptoKey();
  const encoder = new TextEncoder();
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(base64Payload)
  );
  const signatureHex = bufferToHex(signatureBuffer);

  return `${base64Payload}.${signatureHex}`;
}

export async function verifyAdminToken(
  token: string | undefined | null
): Promise<{ valid: boolean; username?: string }> {
  if (!token || !token.includes(".")) {
    return { valid: false };
  }

  try {
    const [base64Payload, signatureHex] = token.split(".");
    const key = await getCryptoKey();
    const encoder = new TextEncoder();

    // Recreate signature
    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(base64Payload)
    );
    const expectedHex = bufferToHex(signatureBuffer);

    if (signatureHex !== expectedHex) {
      return { valid: false };
    }

    const jsonStr = decodeURIComponent(escape(atob(base64Payload)));
    const payload = JSON.parse(jsonStr);

    if (!payload.exp || Date.now() > payload.exp) {
      return { valid: false };
    }

    return { valid: true, username: payload.username };
  } catch (error) {
    return { valid: false };
  }
}

export function validateAdminCredentials(
  user: string,
  pass: string
): boolean {
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD || "tramdalat2026";
  return user.trim() === expectedUser && pass.trim() === expectedPass;
}
