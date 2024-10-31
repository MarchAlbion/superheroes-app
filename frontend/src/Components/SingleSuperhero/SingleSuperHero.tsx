import { Link, useParams } from "react-router-dom";
import { Superhero } from "../../types/superhero";
import { useState, useEffect } from "react";
import { deleteHero, getHeroById, updateHero } from "../../api/api";
import { motion } from "framer-motion";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

export const SingleSuperhero = () => {
  const [superhero, setSuperhero] = useState<Superhero>();
  const { id } = useParams();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [nickname, setNickname] = useState("");
  const [realName, setRealName] = useState("");
  const [originDescription, setOriginDescription] = useState("");
  const [superpowers, setSuperpowers] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [updated, setUpdated] = useState(false);

  const onUpdateClick = async () => {
    const data = {
      nickname,
      real_name: realName,
      origin_description: originDescription,
      superpowers: superpowers,
      catch_phrase: catchPhrase,
    };
    await updateHero(id as string, data);
    setIsEdit(false);
    setUpdated((prev) => !prev);
  };

  useEffect(() => {
    if (id) {
      getHeroById(id).then((res) => {
        setSuperhero(res);
      });
    }
  }, [updated]);

  useEffect(() => {
    if (isEdit) {
      setNickname(superhero?.nickname as string);
      setRealName(superhero?.real_name as string);
      setOriginDescription(superhero?.origin_description as string);
      setSuperpowers(superhero?.superpowers as string);
      setCatchPhrase(superhero?.catch_phrase as string);
    }
  }, [isEdit]);
  const onDeleteClick = async () => {
    await deleteHero(id as string).then((res) => {
      if (res.deletedCount === 1) {
        setIsDeleted(true);
      }
    });
  };

  return (
    <>
      {isDeleted ? (
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-3xl font-bold text-green-800 text-center">
            Superhero deleted successfully
          </h1>
          <Link to="/" className="p-2 bg-green-800 rounded-md text-white mt-4">
            Go to home page
          </Link>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col h-full"
        >
          <div className="flex flex-row gap-x-4 ">
            <Button
              name="Delete Superhero"
              onClick={() => onDeleteClick()}
              type="button"
              bgackgroundColor="bg-red-600"
            />
            <Button
              name={isEdit ? "Undo" : "Edit Superhero"}
              onClick={() => setIsEdit(!isEdit)}
              type="button"
              bgackgroundColor="bg-orange-600"
            />
            {isEdit && (
              <Button
                name="Update"
                onClick={() => onUpdateClick()}
                type="button"
                bgackgroundColor="bg-green-600"
              />
            )}
          </div>

          <div className="relative bg-white h-content mt-2">
            <img
              alt=""
              src={superhero?.images[0]}
              className="h-56 w-full bg-gray-50 object-cover lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-1/2 object-center"
            />
            <div className="mx-auto grid max-w-7xl lg:grid-cols-2 p-5 ">
              <div className="px-6 pb-5 pt-5 sm:pb-5 sm:pt-20 lg:col-start-2 lg:px-8 lg:pt-1 ">
                <div className="mx-auto max-w-2xl lg:mr-0 lg:max-w-lg h-full">
                  <div className="flex-col">
                    {isEdit ? (
                      <Input
                        name="nickname"
                        label="Nickname"
                        labelColor="text-slate-900"
                        placeholder="Enter a nickname"
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                      />
                    ) : (
                      <h2 className="text-5xl font-semibold text-indigo-600 mb-2">
                        {superhero?.nickname}
                      </h2>
                    )}
                    {isEdit ? (
                      <Input
                        name="real name"
                        label="Real name"
                        labelColor="text-slate-900"
                        placeholder="Enter a real Name"
                        type="text"
                        value={realName}
                        onChange={(e) => setRealName(e.target.value)}
                      />
                    ) : (
                      <h3 className="mt-2 text-indigo-600 font-semibold">
                        {superhero?.real_name}
                      </h3>
                    )}
                  </div>
                  {isEdit ? (
                    <Input
                      name="catch phrase"
                      label="Catch phrase"
                      labelColor="text-slate-900"
                      placeholder="Enter a catch phrase"
                      type="text"
                      value={catchPhrase}
                      onChange={(e) => setCatchPhrase(e.target.value)}
                    />
                  ) : (
                    <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                      Phrase: {superhero?.catch_phrase}
                    </p>
                  )}
                  {isEdit ? (
                    <Input
                      name="origin description"
                      label="Origin description"
                      labelColor="text-slate-900"
                      placeholder="Enter a origin"
                      type="text"
                      value={originDescription}
                      onChange={(e) => setOriginDescription(e.target.value)}
                    />
                  ) : (
                    <p className="mt-6 text-lg/8 text-gray-600">
                      Origin: {superhero?.origin_description}
                    </p>
                  )}
                  <div className="mt-5 grid max-w-xl grid-cols-1 gap-4">
                    <div className="flex flex-col gap-y-3 border-l border-gray-900/10 pl-6 w-full">
                      {isEdit ? (
                        <Input
                          name="superpowers"
                          label="Superpowers"
                          labelColor="text-slate-900"
                          placeholder="Enter a superopwers"
                          type="text"
                          value={superpowers}
                          onChange={(e) => setSuperpowers(e.target.value)}
                        />
                      ) : (
                        <div className="text-sm/6 text-green-600">
                          {superhero?.superpowers}
                        </div>
                      )}
                      <div className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                        Superpowers
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 border-l border-gray-900/10 pl-6 md:grid-cols-2 lg:grid-cols-2 mt-5">
                    {superhero?.images.map((image) => (
                      <div className="max-h-36" key={image}>
                        <img
                          src={image}
                          alt={image}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
