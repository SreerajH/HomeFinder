import { Alert, AlertTitle, Button } from '@mui/material';
import RefreshRounded from '@mui/icons-material/RefreshRounded';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Alert
      severity="error"
      variant="outlined"
      action={
        <Button color="inherit" size="small" startIcon={<RefreshRounded />} onClick={onRetry}>
          Retry
        </Button>
      }
    >
      <AlertTitle>We couldn't load listings</AlertTitle>
      {message}. Check your connection and try again.
    </Alert>
  );
}
