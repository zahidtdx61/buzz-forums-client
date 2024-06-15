import axios from "axios";
// import crypto from "crypto";
// import FormData from "form-data";

export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data.data.display_url;
};

export const imageKitUplader = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  console.log(import.meta.env.VITE_IMAGE_KIT_API_KEY);
  // return;
  const response = await axios.post(
    `https://upload.imagekit.io/api/v1/files/upload`,
    formData,
    {
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_IMAGE_KIT_API_KEY}`,
      },
    }
  );
  console.log(response.data);
};
