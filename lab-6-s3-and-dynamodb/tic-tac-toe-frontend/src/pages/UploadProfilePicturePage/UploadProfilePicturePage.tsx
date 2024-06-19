import "../../components/Forms/Forms.style.scss";
import { useEffect, useState } from "react";
import {
  UserProfile,
  getUserProfile,
  uploadProfilePicture,
} from "../../api/ticTacToeApi";
import { usePlayer } from "../../hooks/playerNameContext";
import { useNavigate } from "react-router-dom";

const UploadProfilePicturePage = () => {
  const [image, setImage] = useState<File | null>(null);
  const { playerId } = usePlayer();
  const [playerProfile, setPlayerProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  const fetchProfilePicture = async () => {
    const profile = await getUserProfile(playerId);
    setPlayerProfile(profile);
  };

  useEffect(() => {
    fetchProfilePicture();
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImage(files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      await uploadProfilePicture(playerId, image!);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={"form"}>
      <h2 className={"form__title"}>Set Profile Picture</h2>
      <form className={"form__panel"}>
        <label htmlFor={"codeInput"} className={"form__panel__label"}></label>
        <img
          src={
            image
              ? URL.createObjectURL(image)
              : playerProfile?.profilePictureUrl
          }
          alt={"Profile picture preview"}
          className={"form__panel__image"}
        />
        <input
          type={"file"}
          id={"profile-picture"}
          accept={"image/*"}
          className={"form__panel__image-input"}
          onChange={handleImageChange}
        />
        <input
          type={"button"}
          value={"Confirm"}
          className={"form__panel__button"}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};
export default UploadProfilePicturePage;
