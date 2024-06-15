import "../../components/Forms/Forms.style.scss";
import imagePlaceholder from "../../assets/img-placeholder-transparent.jpg";
import { useState } from "react";
import { uploadProfilePicture } from "../../api/ticTacToeApi";
import { usePlayer } from "../../hooks/playerNameContext";
import { useNavigate } from "react-router-dom";

const UploadProfilePicturePage = () => {
  const [image, setImage] = useState<File | null>(null);
  const { playerId } = usePlayer();
  const navigate = useNavigate();

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
          src={image ? URL.createObjectURL(image) : imagePlaceholder}
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
