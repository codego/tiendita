const force = process.argv.includes("--force");
const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
  .trim()
  .replace(/\/$/, "") || "http://localhost:3000";
const url = `${origin}/api/las21/merchant-mail`;

let response;
try {
  response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ force }),
  });
} catch {
  console.log(
    JSON.stringify(
      {
        ok: false,
        sent: false,
        reason: "server_unreachable",
        force,
        url,
      },
      null,
      2,
    ),
  );
  process.exitCode = 1;
  process.exit(1);
}

let payload = {};
try {
  payload = await response.json();
} catch {
  payload = { ok: false, reason: "bad_response" };
}

console.log(
  JSON.stringify(
    {
      ok: Boolean(payload.ok),
      sent: Boolean(payload.sent),
      reason: payload.reason ?? (response.ok ? "unknown" : "http"),
      status: response.status,
      force,
    },
    null,
    2,
  ),
);

if (!response.ok) {
  process.exitCode = 1;
}
