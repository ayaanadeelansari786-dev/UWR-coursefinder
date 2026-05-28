/**
 * Vercel Serverless Function – /api/airtable
 *
 * Proxies enrollment data to Airtable so the PAT never leaves the server.
 *
 * Required Vercel environment variables (set in Project Settings → Environment Variables):
 *   AIRTABLE_TOKEN   – your Airtable Personal Access Token (pat…)
 *   AIRTABLE_BASE_ID – e.g. appsOV0BUq3z2E80V
 *   AIRTABLE_TABLE_ID – e.g. tblBYRDcSCwToawvR
 */

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID } = process.env;

  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
    console.error("[api/airtable] Missing one or more env vars.");
    return res.status(500).json({ error: "Server misconfigured – missing Airtable env vars." });
  }

  try {
    const data = req.body; // Vercel auto-parses JSON bodies

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            "Confirmation ID":     data.confirmationId    || "",
            "Timestamp":           data.timestamp          || "",
            "Parent Name":         data.parentName          || "",
            "Child Name":          data.childName           || "",
            "Phone":               data.phone               || "",
            "Email":               data.email               || "",
            "Selected Course":     data.selectedCourse      || "",
            "Course ID":           data.courseId             || "",
            "Age Range":           data.ageRange             || "",
            "Experience Level":    data.experienceLevel      || "",
            "Primary Goal":        data.primaryGoal          || "",
            "Interests":           data.interests            || "",
            "Schedule Preference": data.schedulePreference   || "",
          },
        }),
      }
    );

    const result = await airtableRes.json();

    if (!airtableRes.ok) {
      console.error("[api/airtable] Airtable rejected:", result);
      return res.status(airtableRes.status).json({ error: result });
    }

    return res.status(200).json({ status: "success", id: result.id });
  } catch (err) {
    console.error("[api/airtable] Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
