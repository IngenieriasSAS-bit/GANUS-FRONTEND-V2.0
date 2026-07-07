import "./SearchInput.css";

export default function SearchInput({

    placeholder,
    value,
    onChange

}) {

    return (

        <input

            className="search-input"

            type="text"

            placeholder={placeholder}
            value={value}
            onChange={onChange}

        />

    );

}