import axios from "axios";

export const createStory = async (background, text, user, token) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/createstory`,
      {
        background,
        text,
        user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { status: "ok", data };
  } catch (error) {
    return error.response.data.message;
  }
};
