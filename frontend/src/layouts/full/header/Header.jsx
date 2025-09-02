import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import _ from 'lodash';

// components
import Profile from './Profile';
import { IconMenu } from '@tabler/icons-react';
import { useSelector } from 'react-redux';


// Styled wrapper to add purple glow on hover around avatar
const ProfileWrapper = styled('div')(() => ({
  borderRadius: '50%',
  display: 'inline-block',
  cursor: 'pointer',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0 0 8px 2px #8C4AF2',
  },
}));

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: '2px',
  background: theme.palette.background.paper,
  justifyContent: 'center',
  backdropFilter: 'blur(4px)',
  [theme.breakpoints.up('lg')]: {
    minHeight: '70px',
  },
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.secondary,
}));

const Header = (props) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* Hamburger menu for mobile */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: { lg: 'none', xs: 'inline' },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        {/* Welcome Text */}
        <Typography
          variant="body1"
          sx={{
            ml: 1,
            fontWeight: 600,
            color: '#8C4AF2',
            display: { xs: 'none', sm: 'block' },
            whiteSpace: 'nowrap',
          }}
        >
          <h2 style={{ margin: 0 }}>
            Welcome back, {_.startCase(userInfo.name)}!
          </h2>
        </Typography>

        <Box flexGrow={1} />

        {/* Profile only, at far right, responsive */}
        <Stack direction="row" alignItems="center" spacing={1} ml="auto">
          <Tooltip title={_.startCase(userInfo.name)} arrow>
            <ProfileWrapper>
              <Profile />
            </ProfileWrapper>
          </Tooltip>
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  toggleMobileSidebar: PropTypes.func.isRequired,
};

export default Header;
