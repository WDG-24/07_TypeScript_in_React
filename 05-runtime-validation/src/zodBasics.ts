import * as z from 'zod';

let myMessage = 'Hallo, Mars!';

myMessage = 123345;

const MessageSchema = z.string();

const { success, data, error } = MessageSchema.safeParse(myMessage);

// console.log(result);

export {};
