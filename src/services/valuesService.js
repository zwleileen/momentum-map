const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/values`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (valuesId) => {
  try {
    const res = await fetch(`${BASE_URL}/${valuesId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (valuesInputs) => {
  try {
    const res = await fetch(`${BASE_URL}/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valuesInputs),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export { index, show, create };
