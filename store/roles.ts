
export enum Role {
  User = "USER",
  Clinic = "CLINIC",
  Technician = "TECHNICIAN",
  Admin = "ADMIN",
}

export interface AuthState {
  role: Role | null;
  userId: string | null;
  phone: string | null;
  token: string | null;
}

export const initialAuthState: AuthState = {
  role: null,
  userId: null,
  phone: null,
  token: null,
};

export const saveAuth = (state: AuthState) => {
  try {
    localStorage.setItem('zibaas_auth_v1', JSON.stringify(state));
  } catch (e) {
    console.error("Storage Error", e);
  }
};

export const loadAuth = (): AuthState => {
  try {
    const saved = localStorage.getItem('zibaas_auth_v1');
    if (!saved) return initialAuthState;
    return JSON.parse(saved);
  } catch (e) {
    return initialAuthState;
  }
};
