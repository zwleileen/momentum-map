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

const create = async (valuesResults) => {
  try {
    const requestUrl = `${import.meta.env.VITE_BACK_END_SERVER_URL}/values/new`;
    console.log("Sending request to:", requestUrl);
    console.log("Request body:", valuesResults);

    const token = localStorage.getItem("token");
    console.log("🔑 Token being sent:", token); // ✅ Log token
    console.log("Sending request to:", requestUrl);
    console.log("📦 Request body:", JSON.stringify(valuesResults));

    const res = await fetch(requestUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valuesResults),
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

export { index, show, create };
