import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import * as dotenv from "dotenv";
import { ethers } from "ethers";

// import { getSigner } from "~~/lib/notifications.lib";

dotenv.config();

export const sendPushChatMessage = async ({ content }: { content: string }) => {
  // const signer = getSigner(process.env.NEXT_PUBLIC_PUSH_NOTIFICATIONS_SIGNER as string);
  const signer = ethers.Wallet.createRandom();
  const userWolfcitoWorkshop = await PushAPI.initialize(signer, { env: ENV.PROD });

  const walletRecipient = "<0x00000011111111111111111111111111111111>";

  const yedidMessage = await userWolfcitoWorkshop.chat.send(walletRecipient, {
    content: content,
  });

  console.log("yedidMessage:", yedidMessage);

  const stream = await userWolfcitoWorkshop.initStream([CONSTANTS.STREAM.CHAT]);

  stream.on(CONSTANTS.STREAM.CHAT, message => {
    console.log("mensaje stream:", message);
  });

  stream.connect();
};
