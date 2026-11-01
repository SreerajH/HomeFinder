import { AppBar, Box, Chip, Container, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import FavoriteRounded from '@mui/icons-material/FavoriteRounded';
import { useAppSelector } from '../store/hooks';
import { selectSavedCount } from '../store/savedSlice';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import HomeWorkRounded from '@mui/icons-material/HomeWorkRounded';
import type { PaletteMode } from '@mui/material';

interface HeaderProps {
  mode: PaletteMode;
  onToggleMode: () => void;
}

export default function Header({ mode, onToggleMode }: HeaderProps) {
  const nextMode = mode === 'light' ? 'dark' : 'light';
  const label = `Switch to ${nextMode} mode`;
  // Header re-renders only when this number changes, not on every store update
  const savedCount = useAppSelector(selectSavedCount);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1.5 }}>
          <Box
            aria-hidden
            sx={{
              display: 'grid',
              placeItems: 'center',
              width: 36,
              height: 36,
              borderRadius: 2.5,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <HomeWorkRounded fontSize="small" />
          </Box>
          <Typography variant="h6" component="span" sx={{ flexGrow: 1, fontWeight: 700 }}>
            HomeFinder
          </Typography>
          <Chip
            icon={<FavoriteRounded aria-hidden />}
            label={`Saved (${savedCount})`}
            variant="outlined"
            color={savedCount > 0 ? 'secondary' : 'default'}
            aria-live="polite"
            sx={{ '& .MuiChip-icon': { fontSize: 18 } }}
          />
          <Tooltip title={label}>
            <IconButton onClick={onToggleMode} aria-label={label} color="inherit">
              {mode === 'light' ? <DarkModeOutlined /> : <LightModeOutlined />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
