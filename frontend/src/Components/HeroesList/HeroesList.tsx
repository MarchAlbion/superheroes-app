import { motion } from "framer-motion";
import { Superhero } from "../../types/superhero";
import { useState, useEffect } from "react";
import { getAllHeroes } from "../../api/api";
import { Link } from "react-router-dom";

export const HeroList = () => {
  const [superheroesList, setSuperheroesList] = useState<Superhero[]>([]);

  useEffect(() => {
    getAllHeroes().then((res) => {
      setSuperheroesList(res);
    });
  }, []);
  return (
    <>
      {superheroesList.length !== 0 ? (
        <motion.div
          className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {superheroesList.map((superhero) => (
            <Link
              to={`/${superhero._id}`}
              key={superhero._id}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow cursor-pointer group justify-between overflow-hidden"
            >
              <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-t-sm bg-gray-200">
                <img
                  alt=""
                  src={superhero.images[0]}
                  className="object-cover group-hover:scale-110 transition-all duration-500 "
                />
              </div>
              <div className="text-slate-900 font-semibold p-4">
                {superhero.nickname}
              </div>
            </Link>
          ))}
        </motion.div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <Link
            className="p-4 bg-green-800 text-white font-semibold rounded-lg"
            to="/create"
          >
            Create New Superhero
          </Link>
        </div>
      )}
    </>
  );
};
