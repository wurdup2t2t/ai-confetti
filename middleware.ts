import { paymentProxy } from "@x402/next";
import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { registerExactEvmScheme } from "@x402/evm/exact/server";

const server = new x402ResourceServer(
  new HTTPFacilitatorClient({
    url: "https://api.cdp.coinbase.com/platform/v2/x402"
  })
);

registerExactEvmScheme(server);

export const middleware = paymentProxy(
  {
    "/api/confetti": {
      accepts: [
        {
          scheme: "exact",
          price: "$19.99",
          network: "eip155:8453",
          payTo: "0xb559Ab0D1A25799Ee734Ef6401f13FF2C67F18f0"
        }
      ]
    }
  },
  server
);

export const config = {
  matcher: ["/api/confetti"]
};

