import { Modal, useMantineTheme } from '@mantine/core';
import PostShare from '../PostShare/PostShare';

function ShareModal({ modalOpened = false, setModalOpened }) {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      size="lg"
      centered
      radius="md"
      title="Create a Post"   // ✅ better UX
      aria-label="Create post modal"
      overlayProps={{
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 4,
      }}
    >
      {/* 📝 Modal Content */}
      <div style={{ padding: "10px" }}>
        <PostShare />
      </div>
    </Modal>
  );
}

export default ShareModal;