import { pipeline, createHandler } from "@/lib/api/Pipeline";
import { withErrorHandler } from "@/lib/api/middlewares/WithErrorHandler";
import { withAuth } from "@/lib/api/middlewares/WithAuth";
import { withLogging } from "@/lib/api/middlewares/WithLogging";
import { container } from "@/lib/di/Configuration";
import { DI_TYPES } from "@/lib/di/DITypes";
import { GetUserDecksHandler } from "@/context/application/handlers/GetUserDecks.handler";
import { CreateDeckHandler } from "@/context/application/handlers/CreateDeck.handler";

export const GET = pipeline(
  withErrorHandler(),
  withAuth(),
  withLogging({ resource: "decks" }),
  createHandler((req, ctx) => {
    const handler = container.resolve<GetUserDecksHandler>(
      DI_TYPES.GetUserDecksHandler
    );
    return handler.handle(req, ctx);
  })
);

export const POST = pipeline(
  withErrorHandler(),
  withAuth(),
  withLogging({ resource: "decks" }),
  createHandler((req, ctx) => {
    const handler = container.resolve<CreateDeckHandler>(
      DI_TYPES.CreateDeckHandler
    );
    return handler.handle(req, ctx);
  })
);
