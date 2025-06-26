import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { NotFoundComponent } from "./components/NotFound";

export const router = createRouter({
  defaultNotFoundComponent: () => NotFoundComponent(),
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  context: { queryClient: undefined!, auth: undefined! }, 
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
