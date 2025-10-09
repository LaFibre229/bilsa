import z from 'zod';

export function createUserSchema(t) {
  return z.object({
    adress: z.enum(["woman", "lord", "other"], {
      required_error: t("step1.adress")
    }),
    firstname: z.string().min(1, t("step1.firstname")),
    surname: z.string().min(1, t("step1.surname")),
    birthdate: z.string()
      .min(1, t("step1.birthdate"))
      .regex(/^\d{2}\.\d{2}\.\d{4}$/, t("step1.birthdate_format")),
    birthplace: z.string().min(1, t("step1.birthplace")),
    birthcountry: z.string().min(1, t("step1.birthcountry")),
    nationality: z.string().min(1, t("step1.nationality")),
    
    // Step 2
    postalcode: z.string()
      .min(3, t("step2.postalcode_min"))
      .max(10, t("step2.postalcode_max")),
    street: z.string().min(1, t("step2.street")),
    housenumber: z.string().optional(),
    dateresidence: z.string()
      .regex(/^(0[1-9]|1[0-2])\.\d{4}$/, t("step2.dateresidence"))
      .optional(),

    // Step 3
    profession: z.string().min(1, t("step3.profession")),
    otherProfession: z.string().optional(),

    // Step 4
    phone: z.string()
      .min(1, t("step4.phone"))
      .regex(/^[0-9+\-\s()]{6,20}$/, t("step4.phone_format")),
    email: z.string()
      .min(1, t("step4.email"))
      .email(t("step4.email_format")),

    // Step 5
    password: z.string()
      .min(8, t("step5.password_min"))
      .regex(/[a-z]/, t("step5.password_lower"))
      .regex(/[A-Z]/, t("step5.password_upper"))
      .regex(/\d/, t("step5.password_digit"))
  }).refine(
    (data) => {
      if (data.profession.includes("Other") && !data.otherProfession) {
        return false;
      }
      return true;
    },
    {
      message: t("step3.otherProfession"),
      path: ["otherProfession"]
    }
  );
}
