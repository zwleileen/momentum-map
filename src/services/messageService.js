const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/messages`;
//index values
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

const create = async (formData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Handle non-200 responses
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to create values");
    }

    // Only read the response body once
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error creating values:", error);
    throw error;
  }
};

const show = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const responseData = await res.json();
    // console.log("API Response:", responseData);

    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export { index, create, show };
