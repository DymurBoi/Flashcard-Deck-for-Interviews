import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function FormModal({
  open,
  onClose,
  title,
  onSubmit,
  children,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {title && (
          <Typography variant="h6" mb={2}>
            {title}
          </Typography>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {children}
        </form>
      </Box>
    </Modal>
  );
}
