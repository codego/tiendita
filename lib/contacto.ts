export const contactoCopy = {
  title: "Contacto",
  sub: "Marcas y el resto, acá.",
  name: "Nombre",
  email: "Email",
  soy: "Soy",
  marca: "Marca",
  shopper: "Shopper",
  message: "Mensaje",
  submit: "Enviar",
  done: "Mensaje enviado.",
  doneCta: "Ir al feed →",
} as const;

export const CONTACT_STORAGE_KEY = "curadario:contacto";

export type ContactRole = "marca" | "shopper";

export type ContactMessage = {
  name: string;
  email: string;
  role: ContactRole;
  message: string;
  ts: number;
};

export function saveContactMessage(input: {
  name: string;
  email: string;
  role: ContactRole;
  message: string;
}): ContactMessage {
  const entry: ContactMessage = {
    name: input.name.trim(),
    email: input.email.trim(),
    role: input.role,
    message: input.message.trim(),
    ts: Date.now(),
  };
  if (typeof window === "undefined") return entry;
  try {
    const existing = JSON.parse(
      window.localStorage.getItem(CONTACT_STORAGE_KEY) || "[]",
    ) as ContactMessage[];
    existing.push(entry);
    window.localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Local stub — never block the form.
  }
  return entry;
}
