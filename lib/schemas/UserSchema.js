import z from "zod";
export const UserSchema = z.object({
  
    adress: z.enum(["woman", "lord", "other"], {
      required_error: "Please select how we should address you",
    }),
    title: z.enum(["Dr", "Dr.Dr"]).optional(),
    firstname: z.string().min(1, "First name is required"),
    surname: z.string().min(1, "Surname is required"),
    birthname: z.string().optional(),
    birthdate: z
      .string()
      .min(1, "Date of birth is required")
      .regex(/^\d{2}\.\d{2}\.\d{4}$/, "Date must be in format DD.MM.YYYY"),
    birthplace: z.string().min(1, "Birth place is required"),
    birthcountry: z.string().min(1, "Birth country is required"),
    nationality: z.string().min(1, "Nationality is required"),

    // Step 2
    postalcode: z
      .string()
      .min(3, "Postal code must be at least 3 characters")
      .max(10, "Postal code must be at most 10 characters"),
      

    street: z.string().min(1, "Street is required"),

    housenumber: z.string().optional(),

    dateresidence: z
      .string()
      .regex(/^(0[1-9]|1[0-2])\.\d{4}$/, "Format must be MM.YYYY")
      .optional(),
// STEP 3
profession: z.string().min(1, "Profession is required"),
  otherProfession: z.string().optional(),


  // Step 4
    phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s()]{6,20}$/, "Invalid phone number format"),

  email: z
    .string()
    .min(1, "Email is required")
    .email(),

    // Step 5
     password : z
     .string()
     .min(8, "Password must contain at least 8 characters.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[A-Z]/, "Password must contain at least one capital letter.")
  .regex(/\d/, "The password must contain at least one number.")
}).refine(
  (data) => {
    // Validation conditionnelle pour "Other"
    if (data.profession.includes("Other") && !data.otherProfession) {
      return false;
    }
    return true;
  },
  {
    message: "Please specify your profession",
    path: ["otherProfession"], 
  }
  

)