import { paymentProxy } from "@x402/next";
import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { registerExactEvmScheme } from "@x402/evm/exact/server";

const payTo = process.env.X402_PAY_TO_EVM;
if (!payTo) throw new Error("Missing X402_PAY_TO_EVM");

const facilitatorUrl =
  process.env.X402_FACILITATOR_URL || "https://x402.org/facilitator";

const facilitatorClient = new HTTPFacilitatorClient({ url: facilitatorUrl });
const server = new x402ResourceServer(facilitatorClient);
registerExactEvmScheme(server);

export const middleware = paymentProxy(
  {
    "/api/confetti": {
      accepts: [
        {
          scheme: "exact",
          price: "$19.99",
          network: "eip155:8453",
          payTo
        }
      ]
    }
  },
  server
);

export const config = { matcher: ["/api/confetti"] };
