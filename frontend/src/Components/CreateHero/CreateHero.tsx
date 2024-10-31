import { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { motion } from "framer-motion";
import { createNewHero } from "../../api/api";

export const CreateHero = () => {
  const [nickname, setNickname] = useState("");
  const [realName, setRealName] = useState("");
  const [originDescription, setOriginDescription] = useState("");
  const [superpowers, setSuperpowers] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [isCreated, setIsCreated] = useState(false);


  async function createHero() {
    const formData = new FormData();
    const filesArray = Array.isArray(files)
      ? files
      : Array.from(files as FileList);
      if (filesArray.length > 4) {
        alert("You can only upload 4 images");
        return;
      }
    filesArray?.forEach((file) => {
      formData.append("images", file);
    });


    formData.append("nickname", nickname);
    formData.append("real_name", realName);
    formData.append("origin_description", originDescription);
    formData.append("superpowers", superpowers);
    formData.append("catch_phrase", catchPhrase);
    
    await createNewHero(formData, setIsCreated);
  }

  const onHeroCreated = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createHero();
    setNickname("");
    setRealName("");
    setCatchPhrase("");
    setFiles(null);
    setOriginDescription("");
    setSuperpowers("");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-row gap-y-4 h-full justify-center"
    >
      <form
        className="flex flex-row w-full md:w-[70%] lg:w-[70%] self-center gap-y-4   bg-slate-800 rounded-xl group "
        onSubmit={onHeroCreated}
      >
        <div className="flex flex-col w-full gap-y-4 p-5 md:w-[50%]">
          <h1 className="text-3xl font-bold text-gray-300">
            Create a new hero
          </h1>
          <Input
            name="nickname"
            label="Nickname"
            placeholder="Enter a nickname"
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <Input
            name="real_name"
            label="Real name"
            placeholder="Enter a real name"
            type="text"
            value={realName}
            onChange={(e) => {
              setRealName(e.target.value);
            }}
          />
          <Input
            name="origin_description"
            label="Origin description"
            placeholder="Enter an origin description"
            type="text"
            value={originDescription}
            onChange={(e) => {
              setOriginDescription(e.target.value);
            }}
          />
          <Input
            name="superpowers"
            label="Superpowers"
            placeholder="Enter superpowers"
            type="text"
            value={superpowers}
            onChange={(e) => {
              setSuperpowers(e.target.value);
            }}
          />
          <Input
            name="catch_phrase"
            label="Catch phrase"
            placeholder="Enter a catch phrase"
            type="text"
            value={catchPhrase}
            onChange={(e) => {
              setCatchPhrase(e.target.value);
            }}
          />
          <Input
            name="Select Image"
            label="Select Hero Image"
            placeholder="Enter a catch phrase"
            multiple={true}
            type="file"
            onChange={(e) => setFiles(e.currentTarget.files)}
          />
          <Button name="Create" onClick={() => createHero()} />
        </div>
        <div
          className="flex w-0 bg-cover bg-center rounded-tr-xl rounded-br-xl md:w-[50%] lg:w-[70%]"
          style={{
            backgroundImage: `url(/${
              isCreated ? "created.png" : "superBackground.jpg"
            })`,
          }}
        ></div>
      </form>
    </motion.div>
  );
};
