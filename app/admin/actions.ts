"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, createSessionToken, requireAuth, SESSION_COOKIE } from "@/lib/auth";
import { createActualite, deleteActualite, updateActualite, type ActualiteInput } from "@/lib/data/actualites";
import { createEvenement, deleteEvenement, updateEvenement, type EvenementInput } from "@/lib/data/evenements";
import { createDemarche, deleteDemarche, updateDemarche, type DemarcheInput } from "@/lib/data/demarches";
import { updatePageSection } from "@/lib/data/pageSections";
import { updateMairie, type MairieData } from "@/lib/data/coordonnees";
import type { FormState } from "./formState";

// --- Auth ---

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
	const password = String(formData.get("password") || "");
	if (!checkPassword(password)) {
		return { status: "error", message: "Mot de passe incorrect." };
	}
	const store = await cookies();
	store.set(SESSION_COOKIE, createSessionToken(), {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 12,
	});
	redirect("/admin");
}

export async function logoutAction(): Promise<void> {
	const store = await cookies();
	store.delete(SESSION_COOKIE);
	redirect("/admin/login");
}

// --- Actualites ---

function readActualiteInput(formData: FormData): ActualiteInput {
	return {
		slug: String(formData.get("slug") || "").trim(),
		title: String(formData.get("title") || "").trim(),
		excerpt: String(formData.get("excerpt") || "").trim(),
		content: String(formData.get("content") || "").trim(),
		category: String(formData.get("category") || "").trim(),
		date: String(formData.get("date") || "").trim(),
		author: String(formData.get("author") || "").trim(),
		image: String(formData.get("image") || "").trim() || undefined,
	};
}

export async function createActualiteAction(_prev: FormState, formData: FormData): Promise<FormState> {
	await requireAuth();
	const input = readActualiteInput(formData);
	if (!input.slug || !input.title) return { status: "error", message: "Slug et titre requis." };
	await createActualite(input);
	revalidatePath("/actualites");
	revalidatePath("/");
	redirect("/admin/actualites");
}

export async function updateActualiteAction(id: number, _prev: FormState, formData: FormData): Promise<FormState> {
	await requireAuth();
	const input = readActualiteInput(formData);
	if (!input.slug || !input.title) return { status: "error", message: "Slug et titre requis." };
	await updateActualite(id, input);
	revalidatePath("/actualites");
	revalidatePath(`/actualites/${input.slug}`);
	revalidatePath("/");
	redirect("/admin/actualites");
}

export async function deleteActualiteAction(id: number): Promise<void> {
	await requireAuth();
	await deleteActualite(id);
	revalidatePath("/actualites");
	revalidatePath("/");
}

// --- Evenements ---

function readEvenementInput(formData: FormData): EvenementInput {
	return {
		slug: String(formData.get("slug") || "").trim(),
		title: String(formData.get("title") || "").trim(),
		category: String(formData.get("category") || "").trim(),
		dateDebut: String(formData.get("dateDebut") || "").trim(),
		dateFin: String(formData.get("dateFin") || "").trim() || undefined,
		lieu: String(formData.get("lieu") || "").trim(),
		inscriptionRequise: formData.get("inscriptionRequise") === "on",
		inscriptionUrl: String(formData.get("inscriptionUrl") || "").trim() || undefined,
		content: String(formData.get("content") || "").trim(),
		image: String(formData.get("image") || "").trim() || undefined,
	};
}

export async function createEvenementAction(_prev: FormState, formData: FormData): Promise<FormState> {
	await requireAuth();
	const input = readEvenementInput(formData);
	if (!input.slug || !input.title || !input.dateDebut) return { status: "error", message: "Slug, titre et date de debut requis." };
	await createEvenement(input);
	revalidatePath("/agenda");
	revalidatePath("/");
	redirect("/admin/agenda");
}

export async function updateEvenementAction(id: number, _prev: FormState, formData: FormData): Promise<FormState> {
	await requireAuth();
	const input = readEvenementInput(formData);
	if (!input.slug || !input.title || !input.dateDebut) return { status: "error", message: "Slug, titre et date de debut requis." };
	await updateEvenement(id, input);
	revalidatePath("/agenda");
	revalidatePath(`/agenda/${input.slug}`);
	revalidatePath("/");
	redirect("/admin/agenda");
}

export async function deleteEvenementAction(id: number): Promise<void> {
	await requireAuth();
	await deleteEvenement(id);
	revalidatePath("/agenda");
	revalidatePath("/");
}

// --- Demarches ---

function readDemarcheInput(formData: FormData): DemarcheInput {
	return {
		slug: String(formData.get("slug") || "").trim(),
		title: String(formData.get("title") || "").trim(),
		category: String(formData.get("category") || "").trim(),
		content: String(formData.get("content") || "").trim(),
		lienEnLigne: String(formData.get("lienEnLigne") || "").trim() || undefined,
	};
}

export async function createDemarcheAction(_prev: FormState, formData: FormData): Promise<FormState> {
	await requireAuth();
	const input = readDemarcheInput(formData);
	if (!input.slug || !input.title) return { status: "error", message: "Slug et titre requis." };
	await createDemarche(input);
	revalidatePath("/demarches");
	redirect("/admin/demarches");
}

export async function updateDemarcheAction(id: number, _prev: FormState, formData: FormData): Promise<FormState> {
	await requireAuth();
	const input = readDemarcheInput(formData);
	if (!input.slug || !input.title) return { status: "error", message: "Slug et titre requis." };
	await updateDemarche(id, input);
	revalidatePath("/demarches");
	revalidatePath(`/demarches/${input.slug}`);
	redirect("/admin/demarches");
}

export async function deleteDemarcheAction(id: number): Promise<void> {
	await requireAuth();
	await deleteDemarche(id);
	revalidatePath("/demarches");
}

// --- Page sections ---

export async function updatePageSectionAction(id: number, pageSlug: string, _prev: FormState, formData: FormData): Promise<FormState> {
	await requireAuth();
	const title = String(formData.get("title") || "").trim();
	const bodyHtml = String(formData.get("bodyHtml") || "").trim();
	if (!title || !bodyHtml) return { status: "error", message: "Titre et contenu requis." };
	await updatePageSection(id, { title, bodyHtml });
	revalidatePath(`/${pageSlug}`);
	return { status: "success", message: "Section enregistree." };
}

// --- Coordonnees ---

export async function updateMairieAction(_prev: FormState, formData: FormData): Promise<FormState> {
	await requireAuth();
	const input: MairieData = {
		nom: String(formData.get("nom") || "").trim(),
		adresseLigne1: String(formData.get("adresseLigne1") || "").trim(),
		adresseLigne2: String(formData.get("adresseLigne2") || "").trim(),
		codePostal: String(formData.get("codePostal") || "").trim(),
		ville: String(formData.get("ville") || "").trim(),
		telephone: String(formData.get("telephone") || "").trim(),
		fax: String(formData.get("fax") || "").trim(),
		email: String(formData.get("email") || "").trim(),
		horaires: [
			{ jours: String(formData.get("horaires1Jours") || ""), heures: String(formData.get("horaires1Heures") || "") },
			{ jours: String(formData.get("horaires2Jours") || ""), heures: String(formData.get("horaires2Heures") || "") },
		].filter((h) => h.jours && h.heures),
	};
	await updateMairie(input);
	revalidatePath("/", "layout");
	return { status: "success", message: "Coordonnees enregistrees." };
}
