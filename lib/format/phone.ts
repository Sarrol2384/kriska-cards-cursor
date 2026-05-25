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
  if (!e164) return input;
  const digits = e164.slice(3);
  return `+27 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
}

export function whatsappUrl(phone: string, message?: string): string {
  const e164 = normalizeSAPhone(phone) ?? phone;
  const num = e164.startsWith("+") ? e164.slice(1) : e164;
  const base = `https://wa.me/${num}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telUrl(phone: string): string {
  const e164 = normalizeSAPhone(phone) ?? phone;
  return `tel:${e164}`;
}
