import { OAuthClient } from "./oauth.js";

function randomHex(bytes) {
  const buffer = new Uint8Array(bytes);
  crypto.getRandomValues(buffer);
  return Array.from(buffer, (value) => value.toString(16).padStart(2, "0")).join("");
}

function createOAuth(env) {
  return new OAuthClient({
    id: env.GITHUB_OAUTH_ID,
    secret: env.GITHUB_OAUTH_SECRET,
    target: {
      tokenHost: "https://github.com",
      tokenPath: "/login/oauth/access_token",
      authorizePath: "/login/oauth/authorize"
    }
  });
}

function getAllowedOrigins(env) {
  return (env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getRedirectUri(url) {
  return `${url.origin}/callback?provider=github`;
}

function callbackScriptResponse(status, token, message = "") {
  const payload = token ? JSON.stringify({ token }) : JSON.stringify({ error: message || "Authorization failed" });
  const safeStatus = JSON.stringify(status);
  const safePayload = JSON.stringify(`authorization:github:${status}:${payload}`);

  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Decap Authorization</title>
  </head>
  <body>
    <p>${status === "success" ? "Authorizing Decap..." : "Authorization failed."}</p>
    <script>
      const finalMessage = ${safePayload};
      const receiveMessage = () => {
        if (window.opener) {
          window.opener.postMessage(finalMessage, "*");
        }
        window.removeEventListener("message", receiveMessage, false);
        window.close();
      };

      window.addEventListener("message", receiveMessage, false);
      if (window.opener) {
        window.opener.postMessage("authorizing:github", "*");
      }

      setTimeout(() => receiveMessage({ data: ${safeStatus} }), 150);
    </script>
  </body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store"
      }
    }
  );
}

function textResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function validateOrigin(request, env) {
  const allowedOrigins = getAllowedOrigins(env);

  if (allowedOrigins.length === 0) {
    return true;
  }

  const origin = request.headers.get("Origin");
  const referer = request.headers.get("Referer");

  if (origin && allowedOrigins.includes(origin)) {
    return true;
  }

  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      return allowedOrigins.includes(refererOrigin);
    } catch {
      return false;
    }
  }

  return false;
}

async function handleAuth(request, url, env) {
  const provider = url.searchParams.get("provider");
  if (provider !== "github") {
    return textResponse("Invalid provider", 400);
  }

  if (!validateOrigin(request, env)) {
    return textResponse("Origin not allowed", 403);
  }

  if (!env.GITHUB_OAUTH_ID || !env.GITHUB_OAUTH_SECRET) {
    return textResponse("Missing GitHub OAuth configuration", 500);
  }

  const repoIsPrivate = env.GITHUB_REPO_PRIVATE && env.GITHUB_REPO_PRIVATE !== "0";
  const scope = repoIsPrivate ? "repo,user" : "public_repo,user";
  const oauth = createOAuth(env);
  const authorizationUri = oauth.authorizeURL({
    redirectUri: getRedirectUri(url),
    scope,
    state: randomHex(8)
  });

  return Response.redirect(authorizationUri, 302);
}

async function handleCallback(url, env) {
  const provider = url.searchParams.get("provider");
  if (provider !== "github") {
    return textResponse("Invalid provider", 400);
  }

  const code = url.searchParams.get("code");
  if (!code) {
    const error = url.searchParams.get("error_description") ?? url.searchParams.get("error") ?? "Missing code";
    return callbackScriptResponse("error", "", error);
  }

  try {
    const oauth = createOAuth(env);
    const accessToken = await oauth.getToken({
      code,
      redirectUri: getRedirectUri(url)
    });

    return callbackScriptResponse("success", accessToken);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Authorization failed";
    return callbackScriptResponse("error", "", message);
  }
}

function handleHome(request, env) {
  const allowedOrigins = getAllowedOrigins(env);
  const currentOrigin = new URL(request.url).origin;
  return new Response(
    JSON.stringify(
      {
        service: "decap-oauth-proxy",
        status: "ok",
        provider: "github",
        auth: `${currentOrigin}/auth`,
        callback: `${currentOrigin}/callback`,
        allowedOrigins
      },
      null,
      2
    ),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      }
    }
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      return handleAuth(request, url, env);
    }

    if (url.pathname === "/callback") {
      return handleCallback(url, env);
    }

    return handleHome(request, env);
  }
};
