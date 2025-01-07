import exp from "constants";
import zod from "zod";

export const signupBody = zod.object({
  name: zod.string().min(1).max(100),
  email: zod.string().email(),
  password: zod.string().min(6).max(100),
  confirmPassword: zod.string().min(6).max(100),
});

export type signupInput = zod.infer<typeof signupBody>;

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6).max(100),
});
export type signinInput = zod.infer<typeof signinBody>;

const profileBody = zod.object({
  photo: zod.string().optional(),
  course: zod.string(),
  department: zod.string(),
  batch: zod.string(),
  enroll: zod.string().optional(),
  phone: zod.string().optional(),
  linkdn: zod.string().optional(),
  twitter: zod.string().optional(),
  facebook: zod.string().optional(),
  instagram: zod.string().optional(),
});
export type profileInput = zod.infer<typeof profileBody>;
