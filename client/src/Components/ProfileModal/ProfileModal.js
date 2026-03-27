import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/UploadAction';
import { updateUser } from '../../actions/UserAction';

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const param = useParams();

  // remove password from data
  const { password, ...other } = data;

  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🧠 Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📸 Handle image selection
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (e.target.name === "profileImage") {
        setProfileImage(file);
      } else {
        setCoverImage(file);
      }
    }
  };

  // 🚀 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let userData = { ...formData };

    try {
      // Upload profile image
      if (profileImage) {
        const data = new FormData();
        const fileName = Date.now() + "_" + profileImage.name;

        data.append("name", fileName);
        data.append("file", profileImage);

        userData.profilePicture = fileName;

        await dispatch(uploadImage(data));
      }

      // Upload cover image
      if (coverImage) {
        const data = new FormData();
        const fileName = Date.now() + "_" + coverImage.name;

        data.append("name", fileName);
        data.append("file", coverImage);

        userData.coverPicture = fileName;

        await dispatch(uploadImage(data));
      }

      // Update user
      await dispatch(updateUser(param.id, userData));

      setModalOpened(false);

    } catch (error) {
      console.log("Update error:", error);
    }

    setLoading(false);
  };

  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      size="55%"
      overlayProps={{
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <form className="infoForm" onSubmit={handleSubmit}>

        <h3>Update Your Info</h3>

        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>

        {/* Work */}
        <div>
          <input
            type="text"
            placeholder="Works At"
            className="infoInput"
            name="worksAt"
            value={formData.worksAt}
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div>
          <input
            type="text"
            placeholder="Lives in"
            className="infoInput"
            name="livesin"
            value={formData.livesin}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Country"
            className="infoInput"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        {/* Relationship */}
        <div>
          <input
            type="text"
            placeholder="Relationship Status"
            className="infoInput"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
          />
        </div>

        {/* Images */}
        <div>
          <h5>Profile Image</h5>
          <input
            type="file"
            name="profileImage"
            onChange={onImageChange}
            accept="image/*"
          />

          <h5>Cover Image</h5>
          <input
            type="file"
            name="coverImage"
            onChange={onImageChange}
            accept="image/*"
          />
        </div>

        {/* Submit */}
        <button
          className="button infoButton"
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>

      </form>
    </Modal>
  );
}

export default ProfileModal;