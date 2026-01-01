'use strict';

module.exports = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register(/*{ strapi }*/) { },

    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    async bootstrap({ strapi }) {
        try {
            const adminService = strapi.admin.services.user;
            const roleService = strapi.admin.services.role;

            const count = await adminService.count();
            if (count === 0) {
                const superAdminRole = await roleService.getSuperAdmin();
                await adminService.create({
                    email: 'admin@example.com',
                    firstname: 'Admin',
                    lastname: 'User',
                    password: 'StrapiPassword123!',
                    registrationToken: null,
                    isActive: true,
                    roles: [superAdminRole.id],
                });
                strapi.log.info('Admin user created successfully: admin@example.com / StrapiPassword123!');
            }
        } catch (error) {
            strapi.log.error('Bootstrap error: could not create admin user', error);
        }
    },
};
