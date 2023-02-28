import { FunctionComponent, PropsWithChildren, useCallback, useState } from 'react';
import { Box, Hidden, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material/';
import { useAppStore } from '../store/AppStore';
import { ErrorBoundary, AppIconButton } from '../components';
import { LinkToPage } from '../utils/type';
import { useOnMobile } from '../hooks/layout';
import { BOTTOMBAR_DESKTOP_VISIBLE, TOPBAR_DESKTOP_HEIGHT, TOPBAR_MOBILE_HEIGHT } from './config';
import { useEventSwitchDarkMode } from '../hooks/event';
import TopBar from './TopBar';
import SideBar from './SideBar';
import BottomBar from './BottomBar';
import i18n from '../i18n';

// TODO: change to your app name or other word

const TITLE_PUBLIC = 'T9tw-Test'; // Title for pages without/before authentication

/**
 * SideBar navigation items with links
 */
const SIDEBAR_ITEMS: Array<LinkToPage> = [
  {
    title: 'Log In',
    path: '/auth/login',
    icon: 'login',
  },
  {
    title: 'Sign Up',
    path: '/auth/signup',
    icon: 'signup',
  },
];

/**
 * BottomBar navigation items with links
 */
const BOTTOMBAR_ITEMS: Array<LinkToPage> = [
  {
    title: 'Log In',
    path: '/auth/login',
    icon: 'login',
  },
  {
    title: 'Sign Up',
    path: '/auth/signup',
    icon: 'signup',
  },
];

/**
 * Renders "Public Layout" composition
 */
const PublicLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const onMobile = useOnMobile();
  const onSwitchDarkMode = useEventSwitchDarkMode();
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const [lang, setLang] = useState<string>('en');
  const [state] = useAppStore();
  const bottomBarVisible = onMobile || BOTTOMBAR_DESKTOP_VISIBLE;

  // Variant 1 - Sidebar is static on desktop and is a drawer on mobile
  // const sidebarOpen = onMobile ? sideBarVisible : true;
  // const sidebarVariant = onMobile ? 'temporary' : 'persistent';

  // Variant 2 - Sidebar is drawer on mobile and desktop
  const sidebarOpen = sideBarVisible;
  const sidebarVariant = 'temporary';

  const title = TITLE_PUBLIC;
  
  document.title = title; // Also Update Tab Title

  const onSideBarOpen = useCallback(() => {
    if (!sideBarVisible) setSideBarVisible(true); // Don't re-render Layout when SideBar is already open
  }, [sideBarVisible]);

  const onSideBarClose = useCallback(() => {
    if (sideBarVisible) setSideBarVisible(false); // Don't re-render Layout when SideBar is already closed
  }, [sideBarVisible]);

  const changeLanguage = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    i18n.changeLanguage(event.target.value);
  };
  // console.log(
  //   'Render using PublicLayout, onMobile:',
  //   onMobile,
  //   'sidebarOpen:',
  //   sidebarOpen,
  //   'sidebarVariant:',
  //   sidebarVariant
  // );

  return (
    <Stack
      sx={{
        minHeight: '100vh', // Full screen height
        paddingTop: onMobile ? TOPBAR_MOBILE_HEIGHT : TOPBAR_DESKTOP_HEIGHT,
      }}
    >
      <Stack component="header">
        <TopBar
          startNode={<AppIconButton icon="logo" onClick={onSideBarOpen} />}
          title={title}
          endNode={
            <Box display='flex' alignItems='center'>
              <Select
                labelId="demo-simple-select-label"
                id="demo-select-small"
                defaultValue="en"
                // value={lang}
                label="Age"
                onChange={changeLanguage}
                sx={{
                  width: '100px',
                  height: '30px'
                }}
              >
                <MenuItem value='en' selected>English</MenuItem>
                <MenuItem value='cn'>漢語</MenuItem>
              </Select>
              <AppIconButton
                // icon={state.darkMode ? 'day' : 'night'} // Variant 1
                icon="daynight" // Variant 2
                title={state.darkMode ? 'Switch to Light mode' : 'Switch to Dark mode'}
                onClick={onSwitchDarkMode}
              />
            </Box>
          }
        />

        <SideBar
          anchor="left"
          open={sidebarOpen}
          variant={sidebarVariant}
          items={SIDEBAR_ITEMS}
          onClose={onSideBarClose}
        />
      </Stack>

      <Stack
        component="main"
        sx={{
          flexGrow: 1, // Takes all possible space
          padding: 1,
        }}
      >
        <ErrorBoundary name="Content">{children}</ErrorBoundary>
      </Stack>

      <Stack component="footer">{bottomBarVisible && <BottomBar items={BOTTOMBAR_ITEMS} />}</Stack>
    </Stack>
  );
};

export default PublicLayout;
