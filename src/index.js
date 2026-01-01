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

        try {
            // Set Public permissions for Post
            const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
                where: { type: 'public' },
            });

            if (publicRole) {
                const actionsToEnable = ['api::post.post.find', 'api::post.post.findOne'];
                
                const existingPermissions = await strapi.query('plugin::users-permissions.permission').findMany({
                    where: {
                        role: publicRole.id,
                        action: {
                            $in: actionsToEnable,
                        },
                    },
                });

                const existingActions = existingPermissions.map((p) => p.action);
                const newActions = actionsToEnable.filter((action) => !existingActions.includes(action));

                if (newActions.length > 0) {
                    await Promise.all(
                        newActions.map((action) =>
                            strapi.query('plugin::users-permissions.permission').create({
                                data: {
                                    action,
                                    role: publicRole.id,
                                },
                            })
                        )
                    );
                    strapi.log.info('Public permissions for Post enabled');
                }
            }
        } catch (error) {
            strapi.log.error('Bootstrap error: could not set public permissions', error);
        }
    },
};
