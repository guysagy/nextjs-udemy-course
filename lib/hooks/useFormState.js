import React from 'react';

export default function useFormState(action) {
    const [state, setState] = React.useState({disabled: false, error: null});

    const handleSubmit = async (event) => {
        event.preventDefault();
        setState({disabled: true, error: null});

        const form = event.currentTarget;
        const formData = new FormData(form);
        const result = await action(formData);

        if (result?.isError) {
            setState({disabled: false, error: result.message});
        } else  {
            form.reset();
            setState({disabled: false, error: null});
        }
    };

    return [state, handleSubmit];
}