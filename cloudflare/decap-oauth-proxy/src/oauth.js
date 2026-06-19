export class OAuthClient {
  constructor(config) {
    this.clientConfig = config;
  }

  authorizeURL({ redirectUri, scope, state }) {
    const { tokenHost, authorizePath } = this.clientConfig.target;
    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.clientConfig.id,
      redirect_uri: redirectUri,
      scope,
      state
    });

    return `${tokenHost}${authorizePath}?${params.toString()}`;
  }

  async getToken({ code, redirectUri }) {
    const { tokenHost, tokenPath } = this.clientConfig.target;
    const response = await fetch(`${tokenHost}${tokenPath}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: this.clientConfig.id,
        client_secret: this.clientConfig.secret,
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      })
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`GitHub token exchange failed: ${response.status} ${details}`);
    }

    const json = await response.json();

    if (!json.access_token) {
      throw new Error("GitHub token exchange failed: missing access token");
    }

    return json.access_token;
  }
}
