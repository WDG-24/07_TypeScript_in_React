import z from 'zod';

// Schema für Adress-Objekt mit verschachteltem geo-Objekt
const AddressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: z.object({
    // z.coerce.number() konvertiert Strings automatisch zu Numbers vor Validierung
    lat: z.coerce.number({ error: 'Das sollte eine Zahl sein!' }),
    lng: z.coerce.number(),
  }),
});

// Haupt-User-Schema mit verschachtelten Objekten
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  // z.email() validiert E-Mail-Format automatisch
  email: z.email(),
  // Wiederverwendung des AddressSchema für modulare Schema-Definition
  address: AddressSchema,
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
  }),
});

// z.infer<> extrahiert TypeScript-Typ aus Schema
// Das Zod-Schema kann damit als Grundlage für TS dienen
export type User = z.infer<typeof UserSchema>;

// z.array() validiert Array und jedes Element darin
const UserResponseSchema = z.array(UserSchema);

export { UserSchema, UserResponseSchema };
