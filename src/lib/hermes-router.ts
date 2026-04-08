export function routeToAgent(message: string): string {
  const m = message.toLowerCase();
  if (/(copy|headline|tagline|ad|cta|write|slogan)/.test(m)) return "vince";
  if (/(brand|strategy|position|identity|ethics|values)/.test(m)) return "barbara";
  if (/(tiktok|reel|short|video|clip|film|shoot)/.test(m)) return "melvin";
  if (/(youtube|podcast|long.form|documen)/.test(m)) return "gil";
  if (/(event|launch|experience|activation|experiential)/.test(m)) return "eunice";
  if (/(press|pr|partner|b2b|sponsor|media.kit)/.test(m)) return "moss";
  if (/(instagram|pinterest|visual|design|aesthetic|color)/.test(m)) return "romare";
  if (/(twitter|x\.com|reddit|discord|community|conversation)/.test(m)) return "ethel";
  if (/(linkedin|newsletter|email|whatsapp|b2b)/.test(m)) return "claude-b";
  if (/(twitch|livestream|fanbase|blaqspot|stream)/.test(m)) return "dick";
  if (/(soul|culture|black|music|heritage|moment)/.test(m)) return "don";
  return "don";
}
