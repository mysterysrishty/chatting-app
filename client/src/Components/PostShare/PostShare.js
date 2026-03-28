import React, { useState, useRef } from 'react';
import './PostShare.css';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction';

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);

  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // ✅ Prevent crash if user not loaded
  if (!user) return null;

  // 📁 Handle image selection
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // 🔄 Reset form
  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  // 🚀 Submit post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!desc.current.value && !image) return;

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    try {
      if (image) {
        const data = new FormData();
        const filename = Date.now() + "_" + image.name;

        data.append("name", filename);
        data.append("file", image);

        newPost.image = filename;

        await dispatch(uploadImage(data));
      }

      await dispatch(uploadPost(newPost));
      reset();

    } catch (err) {
      console.log("Upload error:", err);
    }
  };

  return (
    <div className="PostShare">

      {/* 👤 PROFILE IMAGE (FIXED) */}
      <img
        src={serverPublic + (user.profilePicture || "defaultProfile.png")}
        alt="profile"
        onError={(e) => {
          e.target.src = serverPublic + "defaultProfile.png";
        }}
      />

      <div>

        {/* ✍️ Caption Input */}
        <input
          type="text"
          placeholder="Write a caption..."
          ref={desc}
        />

        {/* ⚙️ Options */}
        <div className="postOptions">

          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <PhotoOutlinedIcon />
            Photo
          </div>

          <div className="option" style={{ color: "var(--video)" }}>
            <PlayCircleOutlineIcon />
            Video
          </div>

          <div className="option" style={{ color: "var(--location)" }}>
            <LocationOnOutlinedIcon />
            Location
          </div>

          <div className="option" style={{ color: "var(--shedule)" }}>
            <CalendarMonthOutlinedIcon />
            Schedule
          </div>

          {/* 🚀 Share Button */}
          <button
            className="ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Share"}
          </button>

          {/* 📁 Hidden File Input */}
          <input
            type="file"
            ref={imageRef}
            onChange={onImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        {/* 🖼 Image Preview */}
        {image && (
          <div className="previewImage">
            <CloseOutlinedIcon onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}

      </div>
    </div>
  );
};

export default PostShare;