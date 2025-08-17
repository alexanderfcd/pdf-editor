Editor.addModule({
    name: 'image',
    schema: [

        {
            label: 'Image',
            props: {
                accept: 'image/*',
                type: 'file',
                multiple: false

            },
            name: 'file',
        },
        {
            label: 'Radius',
            props: {

                type: 'number',
                min: 0,
                max: 200,
                appendix: 'px',
            },

            name: 'radius',
        },
    ],
    defaults: {
        file: 'https://images.pexels.com/photos/4762770/pexels-photo-4762770.jpeg',
        radius: 10
    }
})