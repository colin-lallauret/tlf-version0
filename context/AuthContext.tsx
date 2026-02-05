import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

type AuthContextType = {
    signIn: (email: string, pass: string) => boolean;
    signOut: () => void;
    user: string | null;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
    signIn: () => false,
    signOut: () => { },
    user: null,
    isAuthenticated: false,
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<string | null>(null);

    const signIn = (email: string, pass: string) => {
        if (email === 'admin@tlf.com' && pass === 'tlf2026') {
            setUser(email);
            return true;
        }
        return false;
    };

    const signOut = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                user,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
