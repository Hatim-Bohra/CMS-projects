import { CollectionConfig } from 'payload/types';

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data && 'title' in data) {
                            return (data.title as string).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                        }
                        return value;
                    },
                ],
            },
        },
        {
            name: 'content',
            type: 'richText',
        },
        {
            name: 'publishedDate',
            type: 'date',
        },
    ],
};
