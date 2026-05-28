const SA_LOCAL = /^0\d{9}$/;
const SA_INTL = /^(?:\+27|0027)?\d{9}$/;

export function normalizeSAPhone(input: string): string | null {
  if (!input) return null;
  const stripped = input.replace(/[\s\-()._]/g, "");
  if (SA_LOCAL.test(stripped)) {
    return `+27${stripped.slice(1)}`;
  }
  const intlMatch = stripped.match(/^(?:\+27|0027)?(\d{9})$/);
  if (intlMatch) {
    return `+27${intlMatch[1]}`;
  }
  return null;
}

export function formatSAPhoneDisplay(input: string): string {
  const e164 = normalizeSAPhone(input);
  if (!e164) return formatPhoneDisplay(input);
  const digits = e164.slice(3);
  return `+27 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
}

/** Generic international display when not SA format */
export function formatPhoneDisplay(input: string): string {
  const stripped = input.replace(/[\s\-()._]/g, "");
  const m = stripped.match(/^(\+\d{1,3})(\d+)$/);
  if (!m) return input.trim();
  return `${m[1]} ${m[2].replace(/(\d{2,3})(?=\d)/g, "$1 ").trim()}`;
}

export function whatsappUrl(phone: string, message?: string): string {
  const stripped = phone.replace(/[\s\-()._]/g, "");
  const e164 = normalizeSAPhone(phone) ?? (stripped.startsWith("+") ? stripped : phone);
  const num = e164.startsWith("+") ? e164.slice(1) : e164;
  const base = `https://wa.me/${num}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telUrl(phone: string): string {
  const e164 = normalizeSAPhone(phone) ?? phone;
  return `tel:${e164}`;
}
