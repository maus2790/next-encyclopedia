import { NextResponse } from "next/server";
import { getAllConceptos } from "@/lib/conceptos";

export async function GET() {
	const conceptos = await getAllConceptos();
	return NextResponse.json(conceptos);
}
