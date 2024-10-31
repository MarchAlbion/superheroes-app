import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { HeroList } from "../Components/HeroesList/HeroesList";
import { CreateHero } from "../Components/CreateHero/CreateHero";
import { SingleSuperhero } from "../Components/SingleSuperhero/SingleSuperHero";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <div className="flex flex-col gap-y-4 justify-between h-full">
            <HeroList />
          </div>
        ),
      },
      {
        path: "/:id",
        element: <SingleSuperhero />,
      },
      {
        path: "/create",
        element: <CreateHero />,
      },
    ],
  },
]);

export default router;
