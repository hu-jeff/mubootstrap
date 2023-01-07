export const nav_options: { parent_title: string, children: { label: string, dest: string }[] }[] = [
    {
        parent_title: "About", children: [
            {
                label: "About Us", dest: "/about"
            },
            {
                label: "Our Lessons", dest: "/lessons"
            },
            {
                label: "Programs", dest: "/programs"
            },
            {
                label: "FAQ", dest: '/faq'
            }]
    },
    {
        parent_title: "Get Involved", children: [
            {
                label: "Volunteer", dest: "/volunteer"
            },
            {
                label: "Teach", dest: "/teach"
            },
            {
                label: "Donate", dest: "/donate"
            },
            {
                label: "Work with Us", dest: "/partner"
            }
        ]
    },
];


export const single_nav_options: { title: string, dest: string }[] = [
    {
        title: "Contact", dest: "/contact"
    },
    {
        title: "Register", dest: "/register"
    },
    {
        title: "Store", dest: "http://music-unbounded.creator-spring.com/"
    }
];