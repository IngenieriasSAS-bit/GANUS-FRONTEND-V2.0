import { useState } from "react";

import ExecutionMetrics from "./ExecutionMetrics";
import ExecutionFilters from "./ExecutionFilters";
import ExecutionLayout from "./ExecutionLayout";

export default function OperativoDashboard() {

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedStatus, setSelectedStatus] = useState("");

    const [filters, setFilters] = useState({

        search: "",

        status: ""

    });

    const applyFilters = () => {

        setFilters({

            search: searchTerm,

            status: selectedStatus

        });

    };

    return (

        <>

            <ExecutionMetrics />

            <ExecutionFilters

                searchTerm={searchTerm}

                setSearchTerm={setSearchTerm}

                selectedStatus={selectedStatus}

                setSelectedStatus={setSelectedStatus}

                onApplyFilters={applyFilters}

            />

            <ExecutionLayout

                filters={filters}

            />

        </>

    );

}