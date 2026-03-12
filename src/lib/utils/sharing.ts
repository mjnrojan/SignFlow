/**
 * Generate a WhatsApp share link for a signing URL.
 */
export function getWhatsAppLink(signingUrl: string): string {
  const text = encodeURIComponent(`Sign this document: ${signingUrl}`);
  return `https://wa.me/?text=${text}`;
}

/**
 * Generate a Viber share link for a signing URL.
 */
export function getViberLink(signingUrl: string): string {
  const text = encodeURIComponent(`Sign this document: ${signingUrl}`);
  return `viber://forward?text=${text}`;
}

/**
 * Copy text to clipboard with a fallback for older browsers.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Build a signing page URL from a document token.
 */
export function getSigningUrl(token: string): string {
  return `${window.location.origin}/sign/${token}`;
}
