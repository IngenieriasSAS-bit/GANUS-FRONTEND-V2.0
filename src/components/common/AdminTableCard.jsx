import SearchInput from "./SearchInput";
import PrimaryButton from "./PrimaryButton";

export default function AdminTableCard({

    title,

    description,

    buttonText,

    searchPlaceholder,

    headers,

    children

}) {

    return (

        <section className="organizationCard">

            <div className="cardHeader">

                <div>

                    <h2>{title}</h2>

                    <p>{description}</p>

                </div>

            </div>

            <div className="toolbar">

                <SearchInput
                    placeholder={searchPlaceholder}
                />

                <PrimaryButton>

                    {buttonText}

                </PrimaryButton>

            </div>

            <table className="organizationTable">

                <thead>

                    <tr>

                        {

                            headers.map((header) => (

                                <th key={header}>

                                    {header}

                                </th>

                            ))

                        }

                    </tr>

                </thead>

                <tbody>

                    {children}

                </tbody>

            </table>

        </section>

    );

}