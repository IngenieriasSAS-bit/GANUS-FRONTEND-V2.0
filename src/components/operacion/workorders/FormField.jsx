export default function FormField({

    field,

    value,

    onChange,

}) {

    if (!field) return null;

    const handleChange = (event) => {

        onChange(

            field.id,

            event.target.value

        );

    };

    switch (field.type) {

        case "text":

            return (

                <div className="wo-form-group">

                    <label>

                        {field.label}

                    </label>

                    <input

                        type="text"

                        value={value || ""}

                        placeholder={field.placeholder || ""}

                        onChange={handleChange}

                    />

                </div>

            );

        case "number":

            return (

                <div className="wo-form-group">

                    <label>

                        {field.label}

                    </label>

                    <input

                        type="number"

                        value={value || ""}

                        onChange={handleChange}

                    />

                </div>

            );

        case "date":

            return (

                <div className="wo-form-group">

                    <label>

                        {field.label}

                    </label>

                    <input

                        type="date"

                        value={value || ""}

                        onChange={handleChange}

                    />

                </div>

            );

        case "textarea":

            return (

                <div className="wo-form-group">

                    <label>

                        {field.label}

                    </label>

                    <textarea

                        rows={4}

                        value={value || ""}

                        onChange={handleChange}

                    />

                </div>

            );

        case "select":

            return (

                <div className="wo-form-group">

                    <label>

                        {field.label}

                    </label>

                    <select

                        value={value || ""}

                        onChange={handleChange}

                    >

                        <option value="">

                            Seleccione...

                        </option>

                        {

                            field.options?.map(

                                option => (

                                    <option

                                        key={option.value}

                                        value={option.value}

                                    >

                                        {option.label}

                                    </option>

                                )

                            )

                        }

                    </select>

                </div>

            );

        default:

            return (

                <div className="wo-form-group">

                    <label>

                        {field.label}

                    </label>

                    <input

                        type="text"

                        value={value || ""}

                        onChange={handleChange}

                    />

                </div>

            );

    }

}