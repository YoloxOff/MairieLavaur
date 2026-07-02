export type FormState = { status: "idle" | "error" | "success"; message?: string };
export const adminInitialState: FormState = { status: "idle" };
