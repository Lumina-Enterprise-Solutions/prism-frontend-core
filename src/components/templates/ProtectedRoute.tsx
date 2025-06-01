import { useState, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { LoadingScreen } from "../organims/loading/LoadingScreen";
import type { RootState } from "../../store";

type ProtectedRouteProps = {
    children: ReactNode;
    redirectTo?: string;
};

export default function ProtectedRoute({ children, redirectTo = "/login" }: ProtectedRouteProps) {
    const [isLoading] = useState(false)
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );
    const location = useLocation()

    if (isLoading) {
        return (
            <LoadingScreen isLoading={true}
                loadingText="Verifying authentication..."
                showProgress={false}
                showDecorations={true}
                logoVariant="icon"
                logoSize="medium"
                backgroundStyle="minimal" />
        )
    }

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />
    }

    return <>{children}</>
}