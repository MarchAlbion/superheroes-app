const url = "http://localhost:3010/superheroes";

export const getAllHeroes = async () => {
  const res = await fetch(url);
  return res.json();
};

export const getHeroById = async (id: string) => {
  try {
    const res = await fetch(`${url}/${id}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const createNewHero = async (
  formData: FormData,
  setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      setIsCreated(true);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteHero = async (id: string) => {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateHero = async (id: string, data: any) => {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
