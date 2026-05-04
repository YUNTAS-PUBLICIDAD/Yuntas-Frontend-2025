'use client';

import { useSettingsContext } from '@/providers/SettingsProvider';
import { getImg } from '@/utils/getImg';

const FALLBACK_LOGO_LIGHT = '/logo.svg';
const FALLBACK_LOGO_DARK = '/logo-white.png';
const FALLBACK_COMPANY_NAME = 'Yuntas Publicidad';

export const useBrandLogo = () => {
  const { general } = useSettingsContext();

  return {
    logoLight: general?.logo_light ? getImg(general.logo_light) : FALLBACK_LOGO_LIGHT,
    logoDark: general?.logo_dark ? getImg(general.logo_dark) : FALLBACK_LOGO_DARK,
    companyName: general?.company_name || FALLBACK_COMPANY_NAME,
  };
};