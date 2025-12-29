import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL;

export async function GET() {
  const token = cookies().get("auth_token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "No autenticado" },
      { status: 401 }
    );
  }

  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/admin/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.response?.data?.message || "Error al obtener usuarios",
      },
      { status: error.response?.status || 500 }
    );
  }
}
