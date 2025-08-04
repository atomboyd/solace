import { advocateData } from "../../../db/seed/advocates";

export async function GET() {
  try {
    // Option 1: Use PostgreSQL database (requires DATABASE_URL environment variable)
    // Uncomment this section for full database functionality
    /*
    const db = await import("../../../db");
    const { advocates } = await import("../../../db/schema");
    const data = await db.default.select().from(advocates);
    return Response.json({ data });
    */

    // Option 2: Use seed data for demo purposes (works without database setup)
    // This is currently active for Vercel deployment demonstration
    const data = advocateData;
    return Response.json({ data });
  } catch (error) {
    console.error("Error fetching advocates:", error);
    // Fallback to seed data if database fails
    const data = advocateData;
    return Response.json({ data });
  }
}
