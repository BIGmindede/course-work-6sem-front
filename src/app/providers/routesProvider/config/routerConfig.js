export const RoutesPaths = {
    main: '/',
    search: "/search",
    review: "/review/:link",
    faq: "/faq",
    about: "/about",
    register: "/register",
    login: "/login",
    profile: "/profile",
    notfound: "/notfound",
}

export const routerConfig = [
    {
        path: RoutesPaths.main,
        element: <div/>
    },
    {
        path: RoutesPaths.search,
        element: <div/>
    },
    {
        path: RoutesPaths.review,
        element: <div/>
    },
    {
        path: RoutesPaths.faq,
        element: <div/>
    },
    {
        path: RoutesPaths.about,
        element: <div/>
    },
    {
        path: RoutesPaths.register,
        element: <div/>
    },
    {
        path: RoutesPaths.login,
        element: <div/>
    },
    {
        path: RoutesPaths.profile,
        element: <div/>
    },
    {
        path: RoutesPaths.notfound,
        element: <div/>
    }
]