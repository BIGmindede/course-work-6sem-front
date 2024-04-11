import { CategoriesAdminPage } from "pages/CategoriesAdminPage";
import { ComplaintsAdminPage } from "pages/ComplaintsAdminPage";
import { MainPage } from "pages/MainPage";
import { ProfilePage } from "pages/ProfilePage";
import { RequestsAdminPage } from "pages/RequestsAdminPage";
import { ReviewPage } from "pages/ReviewPage";
import { ReviewsAdminPage } from "pages/ReviewsAdminPage";
import { UsersAdminPage } from "pages/UsersAdminPage";
import { routesPaths } from "shared/config/router/routerPaths";

export const basicRouterConfig = [
    {
        path: routesPaths.main,
        element: <MainPage/>
    },
    {
        path: routesPaths.notfound,
        element: <div/>
    },
    {
        path: routesPaths.profile,
        element: <ProfilePage/>
    },
    {
        path: routesPaths.review,
        element: <ReviewPage/>
    }
]

export const adminRouterConfig = [
    {
        path: routesPaths.categories,
        element: <CategoriesAdminPage/>
    },
    {
        path: routesPaths.reviews,
        element: <ReviewsAdminPage/>
    },
    {
        path: routesPaths.users,
        element: <UsersAdminPage/>
    },
    {
        path: routesPaths.requests,
        element: <RequestsAdminPage/>
    },
    {
        path: routesPaths.complaints,
        element: <ComplaintsAdminPage/>
    }
]

