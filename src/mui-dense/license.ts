import { LicenseInfo } from '@mui/x-license';

const muiXLicenseKey = import.meta.env.VITE_MUI_X_LICENSE_KEY?.trim();

export const muiXLicenseConfigured = Boolean(muiXLicenseKey);

export function installMuiXLicenseKey() {
    if (muiXLicenseKey) {
        LicenseInfo.setLicenseKey(muiXLicenseKey);
    }
}
