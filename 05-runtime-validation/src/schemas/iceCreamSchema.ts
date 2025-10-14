import z from 'zod';

// Array mit erlaubten Eissorten für Enum-Validierung
export const iceCreamFlavours = ['chocolate', 'vanilla', 'stracciatella', 'mango', 'lemon', 'schlümpfe'];

const IceCreamOrderSchema = z.object({
  // z.enum() validiert dass Werte im definierten Array enthalten sind
  scoops: z.array(z.enum(iceCreamFlavours)),
  cone: z.boolean(),
  // .trim() entfernt Whitespace, .optional() macht Feld nicht erforderlich
  sprinkles: z.string().trim().optional(),
  // .default() setzt Fallback-Wert wenn Feld fehlt
  spoon: z.boolean().default(false),
  // .positive() und .max() mit custom Error Messages
  cream: z.number().positive({ error: 'Zu wenig Sahne' }).max(5, { error: 'Zu viel Sahne' }),
});

export { IceCreamOrderSchema };

// Beispiel-Verwendung:
// const order = {
//   scoops: ['chocolate', 'nougat'],
//   sprinkles: 'chocolate',
//   spoon: true,
//   cream: -3,
// };

// safeParse() gibt { success, data, error } zurück statt Exception zu werfen
// const { data, error, success } = IceCreamOrderSchema.safeParse(order);

// console.log({ data, error, success });

// if (!success) {
// z.prettifyError() formatiert Zod-Fehler in lesbare Strings
//   console.log(z.prettifyError(error));
// }
